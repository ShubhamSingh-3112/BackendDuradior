const cartsave=require('../controllers/cartsaveController')
const cartadd=require('../controllers/addingtocartController')
const express=require('express')

const route=express.Router();
route.get("/add",cartadd)
route.post("/save",cartsave)

module.exports=route