const express=require('express')
require('dotenv').config()
const userauthroute=require('./routes/userlogin_registerationRoute.js')
const dbconnection=require('./database/database.js')
const staffauthroute=require('./routes/stafflogin_registerationRoute.js')
const manageprod=require('./routes/productmanagingRoute.js')
const browseprod=require('./routes/productbrowsingRoute.js')
const add_saveCart=require('./routes/cartsave_addRoute.js')
const create_validateOrder=require('./routes/create_validateOrderRoute.js')
const cors =require('cors')
const app=express()

app.use(cors())
app.use(express.json())
app.use("/api/user/authorize",userauthroute)
app.use("/api/staff/authorize",staffauthroute)
app.use("/api/staff/productmanage",manageprod)
app.use("/api/user/browseproducts",browseprod)
app.use("/api/user/Cart",add_saveCart)
app.use("/api/user/order",create_validateOrder)
const PORT=process.env.PORT||5000 //incase of live server change this

//connect to database as follows
dbconnection().then(()=>
    {
        app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
    }
).catch((err)=>{console.error("Failed to connect to database: ",err)})


