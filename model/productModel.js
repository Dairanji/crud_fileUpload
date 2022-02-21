const express=require('express');
const mongoose=require('mongoose');
const schema=mongoose.Schema;

const ProductSchema=new schema({
    name:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    status:{
        type:Number
    },
    created_at:{
        type:Date,default:Date.now
    }
})

const ProductModel=new mongoose.model('product',ProductSchema);

module.exports=ProductModel;