const mongoose=require('mongoose')
//this is similar to a collection inside the database we created in database.js
const newUser=new mongoose.Schema(
    {
        Name: {type:String,required:true},
        PhoneNum: {type:String,required:true},
        Password: {type:String,required:true}
    })

module.exports=mongoose.model('User',newUser)

