const prodUpdate=require('../controllers/prdouctmanagementController')
const express=require('express')

const route=express.Router()
route.put('/',prodUpdate)

module.exports=route