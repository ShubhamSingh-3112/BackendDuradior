const cart=require('../collections/cartCollection')
const insertcart=async(req,res)=>{
    try
    {
        const {User,Items}=req.body;
        const isfound=await cart.findOne({"userPh":User});
        if(!isfound)
        {
            const ncartitem=new cart({
            userPh:User,
            items:Items
            })
            await ncartitem.save();
            return res.status(201).json("new cart added to db")
        }
        else
        {
            await  cart.findOneAndUpdate({"userPh":User},{"items":Items},{new:true});
            return res.status(200).json("existing users cart is updated") 
        }
    }
    catch(err)
    {
        console.log("error occured while adding to cart",err)
        return res.status(500).json("Error occured while adding to cart")    
    }
}

module.exports=insertcart