const prodUpdate=require('../controllers/productmanagementController')
const express=require('express')

const route=express.Router()
route.put('/',prodUpdate)

module.exports=route