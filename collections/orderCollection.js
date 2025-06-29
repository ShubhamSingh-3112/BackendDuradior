const mongoose=require('mongoose')

const orders=new mongoose.Schema(
    {
        userName:{type:String,required:true},//inserted in createorder(cord)
        razorpayorderID:{type:String,required:true},//cord
        receiptID:{type:String,required:true},//cord
        razorpaypaymentID:{type:String,default:null},
        items:[{//cord
            productID:{type:String,required:true},
            quantity:{type:Number,default:1}
        }],
        amount:{type:Number,required:true},//cord
        address:{type:String,required:true},//cord
        modeOfPay:{type:String,required:true},//cord
        status:{type:String,default:"pending"}//default pending updated in validation
    }
)

module.exports=mongoose.model("Orders",orders)