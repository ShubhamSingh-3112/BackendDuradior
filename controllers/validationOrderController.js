const crypto = require('crypto')
const orderdb = require('../collections/orderCollection')

const validation=async(req,res)=>{
    try
    {
        const{razorpayorderId,razorpaypaymentId,razorpaysignature}=req.body
        
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        hmac.update(razorpayorderId + "|" + razorpaypaymentId);
        const generatedSignature = hmac.digest("hex");
        
        if(generatedSignature===razorpaysignature)
        {
            const updateord=await orderdb.findOneAndUpdate(
                {"razorpayorderID":razorpayorderId},
                {
                    "razorpaypaymentID":razorpaypaymentId,
                    "status":"successful"
                },
                {new:true}
            )
            if(!updateord)
            {   console.log("order_id seems invalid and not found in database")
                return res.status(404).json("Order not found")
            }
            return res.status(200).json("order placed successfully")
        }
        else
        {
            return res.status(400).json("Payment failed")
        }
    }
    catch(err)
    {
        console.error("Error Occurred: ", err)
        res.status(500).json({ error: "Error occurred during payment validation" })
    }
}

module.exports = validation