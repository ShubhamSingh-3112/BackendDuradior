const mongoose=require('mongoose')

const newItem=new mongoose.Schema({
    itemId:{type:String,required:true},
    itemName:{type:String,required:true},
    description:{type:String},//new by shubham
    category:{type:String },// new by shubam 
    quantity:{type:Number,required:true},
    cost:{type:Number,required:true},
    rating:{type:Number,default:0 }//new by shubham to make faster search while browsing 
})

module.exports=mongoose.model('Item',newItem)