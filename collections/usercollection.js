const mongoose=require('mongoose')
//this is similar to a collection inside the database we created in database.js
const newUser=new mongoose.Schema(
    {
        Name: {type:String,require:true},
        PhoneNum: {type:Number,require:true},
        Password: {type:String,require:true}
    })

module.exports=mongoose.model('User',newUser)

