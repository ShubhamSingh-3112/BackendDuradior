const mongoose = require('mongoose')
const urr="mongodb+srv://pawankumary122005:r8RJndoHgnYkwGWM@e-commerce-cluster.lycbojj.mongodb.net/E-CommerceDB?retryWrites=true&w=majority&appName=e-commerce-cluster"
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
        throw err
    }
}

module.exports=connectDB
