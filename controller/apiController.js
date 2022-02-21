const express=require('express');
const Product=require('../model/productModel');
const path=require('path');

//index controller api.
exports.index=(req,res)=>{
    Product.find((err,data)=>{
        if(!err){
            res.status(200).json({
                status:'success',
                result:data,
                message:'data fetched successfuly'
            })
        }else{
            res.status(404).json({
                status:'failed',
                result:err,
                message:'fetch record failed'
            })
        }
    })
}

//store controller api.
exports.store=(req,res)=>{
    const image=req.file
    const Products=new Product({
        name:req.body.name,
        size:req.body.size,
        price:req.body.price,
        image:image.path,
        status:1
    })
    Products.save().then((result)=>{
        res.status(201).json({
            status:'success',
            result:data,
            message:'data added successfully'
        })
    }).catch((err)=>{
        res.status(404).json({
            status:'failed',
            result:err,
            message:'add record failed'
        })
    })
}