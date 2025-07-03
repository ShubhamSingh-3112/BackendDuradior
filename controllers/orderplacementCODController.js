const orderdb=require('../collections/orderCollection')
const Item = require('../collections/itemsCollection');

const norder=async (req,res)=>{
    try
    {
        const {userName,phNum,items,amount,address,modeOfPay}=req.body
        const receiptID = "order_" + Date.now();

        for (const orderItem of items) {
            await Item.findOneAndUpdate(
        { itemId: orderItem.productID },
        { $inc: { quantity: -(orderItem.quantity || 1) } }
    );
}


        const nworder=new orderdb(
            {
                userName:userName,
                phNum:phNum,
                receiptID:receiptID,
                items:items,
                amount:amount,
                address:address,
                modeOfPay:modeOfPay,
                status:"pending (will be paid on delivery)"
            }
        )
        await nworder.save()
        
        res.status(200).json({msg:"Order placed payment to be done on delivery",receiptId:receiptID})
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({"Error encountered":err})
    }
}

module.exports=norder