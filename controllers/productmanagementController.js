const Item=require("../collections/itemsCollection.js")
//for this it should axios.put and not axios.post
const updateData=async (req,res)=>{
    try
    {
        const {ItemId,ItemName,Description,Category,Quantity,Cost,Rating,Process}=req.body
        if(Process==="Add")
        {
            const nitem=new Item({
                itemId:ItemId,
                itemName:ItemName,
                description:Description,//new by shubham
                category:Category,// new by shubam 
                quantity:Quantity,
                cost:Cost,
                rating:Rating
            })
            await nitem.save()
            console.log("Item added to the database")
            return res.status(201).json("New Item added to the database");
        }
        if(Process==="Update")
        {
            const val=await Item.findOneAndUpdate(
                {"itemId":ItemId},
                {"$set":{
                    "itemName":ItemName,
                    "description":Description,//new by shubham
                    "category":Category,// new by shubam 
                    "quantity":Quantity,
                    "cost":Cost,
                    "rating":Rating
                    }
                },
                {runValidators:true}
            )

            if(val)
            {
                console.log("Item updated in the database")
                return res.status(200).json("Item's details in the database has been updated")
            }
            else
            {
                console.log("Item not found in the database to update")
                return res.status(400).json("Item not found")
            }
        }
        if(Process==="Delete")
        {
            const result=await Item.findOneAndDelete({"itemId":ItemId})
            if(result)
            {
                console.log("item has been deleted")
                return res.status(202).json("Item has been deleted from the database")
            }
            else
            {
                console.log("item with the specified details not present in the databse")
                return res.status(400).json("Item not found")
            }
        }
        return res.status(404).json("No particular process specified. Specify add or update or delete")
    }
    catch(err)
    {
        return res.status(500).json("Server Error Try again later")
    }
}
module.exports=updateData