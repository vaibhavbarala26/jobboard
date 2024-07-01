const Router = require("express");
const UserModel = require("../Model/User");
const { genSalt, genSaltSync, hashSync, compare } = require("bcrypt");
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken");
const multer = require("multer")
const JobModel = require("../Model/JobSchema");
const fs = require("fs");
const CompanyModel = require("../Model/ComapnySchema");
const { log } = require("console");
const { loadavg } = require("os");
const uploadmid = multer({ dest: "uploads" })
const AppRouter = Router();
AppRouter.post("/register",
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 6 }).withMessage("password must be of atleast 6 characters"),
    body("name").isLength({ min: 6 }).withMessage("username must be of 6 characters"),
    async (req, res) => {
        const { name, email, password } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const salt = genSaltSync(10);
            const hashed = hashSync(password, salt);
            const user = await UserModel.create({ name, email, password: hashed })
            res.clearCookie("token", "26020451202", { path: "/", domain: "localhost", httplOnly: true, signed: true })
            const expires = new Date()
            expires.setDate(expires.getDate() + 7)
            const payload = { name, email }
            const token = jwt.sign({ payload }, "26020451202");
            res.cookie("token", token, "26020451202", { path: "/", domain: "localhost", httplOnly: true, signed: true, expires })
            res.status(200).json(user)
        }
        catch (E) {
            console.log("23");
        }
    })

AppRouter.post("/login", body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 6 }).withMessage("password must be of atleast 6 characters"),
    async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(400).json({ msg: "user not found" })
            }
            const ispass = await compare(password, user.password)
            if (!ispass) {
                return res.status(400).json({ msg: "wring credentials" })
            }
            res.clearCookie("token", "26020451202", { path: "/", domain: "localhost", httplOnly: true, signed: true })
            const expires = new Date()
            expires.setDate(expires.getDate() + 7)
            const payload = { email, password }
            const token = jwt.sign({ payload }, "26020451202");
            res.cookie("token", token, "26020451202", { path: "/", domain: "localhost", httplOnly: true, signed: true, expires })
            res.status(200).json(user)
        }
        catch (e) {
            console.log("error");
        }

    })
AppRouter.get("/user", async (req, res) => {
    const token = req.cookies;
   
    if (!token) {
        return res.status(400).json({ msg: "Token not found" })
    }
        const us = jwt.verify(token.token, "26020451202")
        if (!us) {
            return res.status(400).json({ msg: "Token not found" })
        }
        else {
            const user = await UserModel.findOne({ email: us.payload.email })
            res.status(200).json({ user })
        }
    
})
AppRouter.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", "26020451202", { path: "/", domain: "localhost", httplOnly: true, signed: true })
        res.status(200).json({ msg: "successfully LoggedOut" })
    }
    catch (e) {
        res.status(400)
    }
})
AppRouter.post("/postcompany", async (req, res) => {
    const { name } = req.body
    const company = await CompanyModel.create({ name })
    res.status(200).json({ company })
})
AppRouter.get("/postcompany", async (req, res) => {
    const user = await CompanyModel.find();
    res.status(200).json(user)
})
AppRouter.post("/jobdetails", uploadmid.single("file"), async (req, res) => {
    const jobs = await JobModel.create(req.body)
    res.status(200).json(jobs);
})
AppRouter.get("/jobdetails", async (req, res) => {
    const jobs = await JobModel.find().sort({ time: -1 });
    res.status(200).json(jobs)
})
AppRouter.put("/jobdetails/:id", async (req, res) => {
    const { id } = req.params
    const user = await JobModel.findByIdAndUpdate(id, req.body);
    res.status(200).json(user)
})
AppRouter.delete("/jobdetails/:id", async (req, res) => {
    const { id } = req.params;
    const user = await JobModel.findByIdAndDelete(id);
    if (!user) {
        return res.status(400).json("user not found")
    }
    res.status(200).json("successfully deleted")
})
AppRouter.put("/apply/:id", async (req, res) => {
    const { id } = req.params;
    const job = await JobModel.findById(id)
    if (!job) {
        return res.status(400).json("job not found")
    }
    const {token}  = req.cookies;
    console.log(token);
    if (!token) {
        return res.status(400).json("token not found")
    }
    const user = jwt.verify(token, "26020451202");
    const users = await UserModel.findOne({ email: user.payload.email })
    const jobi = users.jobs;
    jobi.push(job)
    const jobb = await UserModel.findByIdAndUpdate(users._id , {jobs:jobi});
    const appli = job.applicants;
    appli.push(users)
    const applicants = await JobModel.findByIdAndUpdate(id , {applicants:appli})
    res.status(200).json("Success")
    
})
AppRouter.get("/user" , async(req , res)=>{
    const user = await UserModel.find();
    res.json(user)
})
AppRouter.get("/job/:id" , async(req , res)=>{
    const {id} = req.params;
    const job = await JobModel.findById(id);
    if(!job){ 
        res.status(400).json("job not found")
    }
    else{
        res.status(200).json(job)
    }
})
AppRouter.get("/applicants/:id" , async(req , res)=>{
    const {id} = req.params
    const user = await UserModel.findById(id)
    res.status(200).json(user)
})
AppRouter.patch("/applicantjob/:id" , async(req ,res)=>{
    const {id} = req.params;
    const {aid} = req.body;
    if(aid){
    const job = await JobModel.findById(id)
    const array = job.applicants
    const find = array.findIndex((arr)=>arr._id == aid)
    if(find>-1){
        array.splice(find , 1);
    }
    const jobi = await JobModel.findByIdAndUpdate(id , {applicants:array})
    console.log(job);
    const applicant = await UserModel.findById(aid)
    const jobarr = applicant.jobs
    const found = jobarr.findIndex((arr)=>arr._id == id)
    console.log(found);
    const object = jobarr[found]
    if( found>-1){
        jobarr.splice(found , 1);
    }
    console.log(job.name);
    object.name = `${job.name} : - We are Sorry`
    object.jobtitle=`due to limited resources `,
    jobarr[found] = object;
    const changed = await UserModel.findByIdAndUpdate(aid ,{jobs:jobarr} )
    res.status(200).json("success")
}
})
AppRouter.patch("/applicantjobacc/:id" , async(req , res)=>{
    const {id} = req.params;
    const {aid} = req.body;
    if(aid){
        const job = await JobModel.findById(id)
        const appli = job.applicants;
        
        const found = appli.findIndex((app)=> app._id == aid);
        if(found>-1){
            const uid = appli[found]._id
            const employ = await UserModel.findById(uid);
            const joo =  employ.jobs
            const ff = joo.findIndex((a)=>a._id == id)
            const object = joo[ff];
            object.name = `${job.name}:-you are selected for interview round`
            object.jobtitle = `congsratulation ${employ.name}`
            joo[ff] = object
            const oo = await UserModel.findByIdAndUpdate(aid ,{jobs:joo} )
            res.json(employ)
        }
    } 
})

module.exports = AppRouter