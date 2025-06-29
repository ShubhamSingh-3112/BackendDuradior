const express=require('express')
const app=express()
//now getting the user from usercollection
const User =require('../collections/usercollection.js')
const bcrypt = require('bcrypt')

const register=async(req,res)=>{
    try
    {
        const { Name, PhoneNum, Password } = req.body;//to check if the user with email already exits add an if here

        const hashpwd = await bcrypt.hash(Password, 10)
        const nuser = new User(
            {
                Name,
                PhoneNum,
                Password: hashpwd
            });

        await nuser.save();
        console.log("User saved successfully:"); // Log saved user
        res.status(201).json("Registeration Successful. Account Created")
        
    }
    catch (err) 
    {
        console.error("Registration error:", err); // Log the actual error
        res.status(500).json("Registration error.");
    }
}

module.exports=register