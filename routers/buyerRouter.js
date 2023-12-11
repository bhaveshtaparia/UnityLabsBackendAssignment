const express=require('express')
const router=express.Router();
const User=require('../models/usersModel');
const Catalog=require('../models/catalogsModel');
const { auth } = require('../middleware/auth');
const { authorizeRole } = require('../middleware/role');

// show the list of all seller
const showSellerDetails=async(req,res)=>{
    try{
        const seller=await User.find({"type":"seller"}).select("username");
        res.status(200).json({
            seller,
        })
    }catch(err){
        // console.log(err);
        res.status(404).json({
            "message":"SomeThing went wrong, try after some time",
            "success":false
        })
    }
}


router.route('/list-of-sellers').get(auth,authorizeRole("buyer"),showSellerDetails);


// get the catalog of seller 
const getCatalogOfSeller=async(req,res)=>{
    const sellerId=req.params.seller_id
    try{
        const seller=await User.findOne({_id:sellerId,type:"seller"});
        if(seller){
            const catalog=await Catalog.findOne({sellerId:sellerId});
            res.status(200).json({
                catalog,
            })

        }else{
               res.status(404).json({
                "message":"incorrect id , seller not Found"
            })
        }
    }catch(err){
        // console.log(err);
        res.status(404).json({
            "message":"Incorrect seller id",
            "success":false
        })
    }
}


router.route('/:seller_id').get(auth,authorizeRole("buyer"),getCatalogOfSeller);







module.exports=router;