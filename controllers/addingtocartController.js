const items=require('../collections/itemsCollection')

const ispresent=async(req,res)=>{
    try
    {
        const itemid=req.query.itemid;//single item checking is gonna be a get request
        const isfound=await items.findOne({"itemId":itemid})
        if(!isfound)
        {
            return res.status(404).json("invalid itemid given such item doesnt exist")
        }
        if(isfound.quantity>0)
        {
            return res.status(200).json("allow item to be inserted")
        }
        if(isfound.quantity<=0)
        {
            return res.status(409).json("item present but not enough quantity")
        }
    }
    catch(err)
    {
        return res.status(500).json("unknown error encountered")
    }
}
module.exports=ispresent