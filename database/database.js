const mongoose = require('mongoose')
const urr=process.env.MONGO_URI
//this is just for connecting to the database common to all collections
const connectDB=async ()=>
{
    try
    {
        mongoose.connect(urr, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database Connected")
    }
    catch(err)
    {
            console.error("Database Connection error:")
    }
}

module.exports=connectDB