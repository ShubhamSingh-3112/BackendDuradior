const prodbrowse=require('../controllers/productbrowsingController')
const express=require('express')

const route=express.Router()
route.get("/",prodbrowse)

module.exports=route