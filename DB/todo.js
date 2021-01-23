const mongoose = require("mongoose")

const TODO = new mongoose.Schema({
    title : {
        require:true,
        type:String
    },
    description:{
        require: true,
        type:String
    },
    deadline:{
        type:String
    },
    status : {
        type:String,
        default : "TODO"
    }
}
)

module.exports = mongoose.model("TODO", TODO)