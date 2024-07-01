const mongoose = require("mongoose")
const companySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
})
const CompanyModel = mongoose.model("companie" , companySchema)
module.exports = CompanyModel