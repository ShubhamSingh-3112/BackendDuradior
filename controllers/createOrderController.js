const razorpay=require('razorpay')
const orderdb=require('../collections/orderCollection')
const instance=new razorpay(
    {
        key_id:process.env.RAZORPAY_KEY,
        key_secret:process.env.RAZORPAY_SECRET
    }
)

const creatingOrder=async(req,res)=>
{   
    try
    {    
        const receiptId = "order_" + Date.now();//this is for our purpose to uniquely identify each order
        const {userName,items,amount,address,modeOfPay}=req.body;
        //verification of the payment
        const option={
            amount:amount*100,
            currency:"INR",
            receipt:receiptId,
            payment_capture:true
            }
    
        const order=await instance.orders.create(option)
          //inserting into order databse
        const norderdb=new orderdb({
            userName:userName,
            items:items,
            address:address,
            amount:amount,
            modeOfPay:modeOfPay,
            razorpayorderID:order.id,
            receiptID:receiptId
        })
        await norderdb.save()
        return res.json(order)
    }
    catch(er)
    {
        console.error(er)
        return res.status(500).json({err:"Error while creating order in razorpay"})
    }
}

module.exports=creatingOrder