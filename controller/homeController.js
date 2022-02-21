const express=require('express');
const Product=require('../model/productModel')
const path=require('path');
const flash=require('connect-flash');
const session=require('express-session');

//index page controller.
exports.index=(req,res)=>{
    Product.find((err,data)=>{
        if(!err){
            res.render('index',{
                title:"index page",
                message:req.flash('message'),
                viewdata:data
            })
        }
    })
}

//register page controller.
exports.register=(req,res)=>{
    res.render('register',{
        title:"register page",
        error:req.flash('error'),
        data:"register data"
    })
}

//store the data.
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
        console.log(result,"added successfully");
        req.flash('message','Product added successfully.')
        res.redirect('/');
    }).catch((err)=>{
        console.log(err,"add failed");
        req.flash('error','You cannot send blank data');
        res.redirect('/add-product')
    })
}

//edit page controller.
exports.edit=(req,res)=>{
    const product_id=req.params.u_id
    Product.findById(product_id).then(result=>{
        console.log(result);
        res.render('edit',{
            viewdata:result
        })
    }).catch(err=>{
        console.log(err);
    })
}

//update page controller.
exports.update=(req,res,next)=>{
    const product_id=req.body.uid
    const name=req.body.name
    const size=req.body.size
    const price=req.body.price
    const image=req.file
    Product.findById(product_id).then((result)=>{
        result.name=name
        result.size=size
        result.price=price
        result.image=image.path

        return result.save().then(results=>{
            res.redirect('/');
            console.log(result,"Data Updated");
        }).catch(err=>{
            console.log(err,"Update Failed");
        })
    })
}

//delete the data.
exports.delete=(req,res)=>{
    const productId=req.params.u_id
    Product.deleteOne({_id:productId}).then(deletedata=>{
        console.log(deletedata,"delete successful");
        res.redirect('/');
    }).catch(err=>{
        console.log((err,"delete failed"));
    })
}