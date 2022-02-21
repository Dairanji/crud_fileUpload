const express=require('express');
const Route=express.Router();
const homeController=require('../controller/homeController');

Route.get('/',homeController.index);
Route.get('/add-product',homeController.register);
Route.post('/productstore',homeController.store);
Route.get('/edit/:u_id',homeController.edit);
Route.post('/update',homeController.update);
Route.get('/delete/:u_id',homeController.delete);

module.exports=Route;