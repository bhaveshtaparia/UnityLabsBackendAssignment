const express=require('express')
const jwt=require('jsonwebtoken')
const User=require('../models/usersModel');

// user sign up  router 
const signup=async(req,res)=>{

    try{
       if(!req.body.type || (req.body.type!="buyer" && req.body.type!="seller")){
        res.status(404).json({
            message:"type should be buyer or seller",
            success:false
        })
        return;
       }
     if(req.body.password!==req.body.cpassword){
        res.status(404).json({
            message:"password doesn't match",
            success:false
        })
     }else{
        const user=await User.create(req.body);
        // console.log(signup._id)
        const payload={
            userId:user._id
        }
        
        const token=jwt.sign(payload,process.env.SECRETKEY)
        
        const options={
            expires:new Date(Date.now()+process.env.EXPIREC*24*60*60*1000),
            httpOnly:true,
            sameSite: 'none',
            secure:true
        }
        res.status(201).cookie('token',token,options).json({
            user,
            message:"Successfully signup",
            token
        })
     }
    }catch(err){
        if (err.message) {
            res.status(400).json({ message: err.message });
        } else{

            res.status(500).json({ message: 'An error occurred during signup.' });
        }     
    }
}

const router=express.Router();
router.route('/register').post(signup);
module.exports=router;