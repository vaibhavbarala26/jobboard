const mongoose = require("mongoose")
const url = "mongodb+srv://golu:vaibhav@cluster0.omnybfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectiona = async()=>{
    try{
        await mongoose.connect(url)
        .then(()=>{
            console.log("connection");
        })
    }
    catch(E){
        console.log("error");
    }
}
module.exports = connectiona