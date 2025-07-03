const items=require('../collections/itemsCollection')

const ispresent=async(req,res)=>{
    try
    {
        const {itemid,quantity}=req.query//single item checking is gonna be a get request
        const isfound=await items.findOne({itemId:itemid})
        console.log(itemid,quantity)
        if(!isfound)
        {
            console.log(406)
            return res.status(406).json("invalid itemid given such item doesnt exist")
        }
        if(isfound.quantity>=quantity)
        {
            console.log(200)
            return res.status(200).json("allow item to be inserted")
        }
        if(isfound.quantity<quantity)
        {
            console.log(409)
            return res.status(409).json("item present but not enough quantity")
        }
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json("unknown error encountered")
    }
}
module.exports=ispresent