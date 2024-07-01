const mongoose = require("mongoose")
const userarraySchema = mongoose.Schema({
    id:{
        type:String,
        required:true,
    }
})
const JobSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    authorid:{
        type:String,
        required:true,
    },
    jobtitle:{
        type:String,
        required:true,
    },
    workinglocation:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }, 
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
    },
    salary:{
        type:String,
    },
    contact:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    applicants:[userarraySchema]
    , 
    time : { type : Date, default: Date.now }
})
const JobModel = mongoose.model("Job", JobSchema)
module.exports = JobModel;