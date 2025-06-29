const staff=require('../collections/staffCollection.js')
const bcrypt=require('bcrypt')

const staffregister=async(req,res)=>{
    try
    {
        const{ sname,sid,spwd }=req.body
        const hpwd=await bcrypt.hash(spwd,10)
        const nstaff=new staff(
            {
                staffName:sname,
                staffId:sid,
                Password:hpwd
            }
        )
        await nstaff.save()
        console.log("User saved successfully:"); 
        res.status(201).json("Registeration Successful. Account Created")
    }
    catch(err)
    {
        console.error("Registration error:", err); // Log the actual error
        res.status(500).json("Registration error.");
    }
}

module.exports=staffregister