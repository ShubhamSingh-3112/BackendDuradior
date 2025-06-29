const express=require('express')
const staffreg=require('../controllers/staffregisterController')
const stafflog=require('../controllers/staffloginController')

const route=express.Router()
route.post('/register',staffreg)
route.post('/login',stafflog)
module.exports=route