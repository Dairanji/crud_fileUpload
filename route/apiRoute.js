const express=require('express');
const Route=express.Router();
const apiController=require('../controller/apiController');

Route.get('/',apiController.index);
Route.post('/productstore',apiController.store);



module.exports=Route;