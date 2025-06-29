const { validate } = require('../collections/usercollection')
const createcontrol=require('../controllers/createOrderController')
const validatecontrol=require('../controllers/validationOrderController')
const express=require('express')

const route=express.Router()
route.post("/create",createcontrol)
route.post("/validate",validatecontrol)

module.exports=route