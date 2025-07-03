const mongoose=require('mongoose')
// this collection is for storing the company staff details
const newStaff=new mongoose.Schema(
    {
        staffName:{type:String,required:true},
        staffId:{type:Number,required:true},
        Password:{type:String,required:true}
    }
)
module.exports=mongoose.model('Staff',newStaff)