const mongoose=require('mongoose')

const cartitems=new mongoose.Schema({
    userPh:{type:String,required:true},
    items:[{
        productID:{type:String,required:true},
        quantity:{type:Number,default:1}
    }]
})

module.exports=mongoose.model("cart",cartitems)