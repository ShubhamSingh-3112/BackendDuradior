const staff=require('../collections/staffCollection')
const bcrypt=require('bcrypt')

const stafflogin=async(req,res)=>
{
    try
    {
        const{ sid,spwd }=req.body
        const isfound=await staff.findOne({staffId: sid})
        if(!isfound)
        {
            return res.status(404).json("Staff not found. Register first")
        }
        const match=await bcrypt.compare(spwd,isfound.Password)
        if(!match)
        {
            return res.status(401).json("Invalid credentials. Enter correct password")
        }
        return res.status(200).json("Login Successful")
    }
    catch(err)
    {
        console.log("Login Error:",err)
        return res.status(500).json("Internal server error")
    }
}
module.exports=stafflogin