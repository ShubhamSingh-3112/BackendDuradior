const createcontrol=require('../controllers/createOrderController')
const validatecontrol=require('../controllers/validationOrderController')
const codcreate=require('../controllers/orderplacementCODController')
const express=require('express')

const route=express.Router()
route.post("/cod",codcreate)
route.post("/create",createcontrol)
route.post("/validate",validatecontrol)

module.exports=route