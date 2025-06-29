const mongoose=require('mongoose')

const cartitems=new mongoose.Schema({
    userPh:{type:String,require:true},
    items:[{
        productID:{type:String,require:true},
        quantity:{type:Number,default:1}
    }]
})

module.exports=mongoose.model("cart",cartitems)