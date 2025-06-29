const express=require('express')
const regcontrol = require('../controllers/userregisterationController.js')
const logcontrol = require('../controllers/userloginController.js')

const route=express.Router();
route.post('/register',regcontrol)
route.post('/login',logcontrol)
module.exports=route