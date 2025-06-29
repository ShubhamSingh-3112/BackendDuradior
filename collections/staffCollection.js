const mongoose=require('mongoose')
// this collection is for storing the company staff details
const newStaff=new mongoose.Schema(
    {
        staffName:{type:String,require:true},
        staffId:{type:Number,require:true},
        Password:{type:String,require:true}
    }
)
module.exports=mongoose.model('Staff',newStaff)