const express=require('express')
const router=express.Router();
const Catalog=require('../models/catalogsModel');
const { auth } = require('../middleware/auth');
const { authorizeRole } = require('../middleware/role');

const createCatalog=async(req,res)=>{
    const products=req.body.products;
    try{
        if(products && products.length>0){
              const user=await Catalog.findOne({sellerId:req.user._id});
              // checking  seller already created catalog
              if(user){
                res.status(404).json({
                    message:"one seller can create only one catalog",
                    success:false
                })
                return ;
              }
              const catalog=await Catalog.create({sellerId:req.user._id,Products:products});
              res.status(201).json({
                message:"catalog created Successfully",
                success:true,
                catalog
              })
        }else{
            res.status(404).json({
                message:"Enter the List of product",
                success:false
            })

        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Try after some time / server err",
            success:false
        })
    }
}

router.route('/create-catalog').post(auth,authorizeRole("seller"),createCatalog);







module.exports=router;