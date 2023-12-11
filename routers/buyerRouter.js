const express=require('express')
const router=express.Router();
const User=require('../models/usersModel');
const Catalog=require('../models/catalogsModel');
const Order=require('../models/orderModel')
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

router.route('/seller-catalog/:seller_id').get(auth,authorizeRole("buyer"),getCatalogOfSeller);


// buyer place the order 
const placeOrder = async (req, res) => {
    const buyerId = req.user._id; 
    const sellerId = req.params.seller_id;
    const items = req.body.items;
      if(!(items && items.length>0)){
        res.status(404).json({
            message:"atleast add one item from catalog",
            success:false
        })
        return ;
      }
    try {
      // Check if the seller exists and is of type "seller"
      const seller = await User.findOne({ _id: sellerId, type: "seller" });
  
      if (seller) {
        // Retrieve the catalog for the specified seller
        const catalog = await Catalog.findOne({ sellerId: sellerId });
  
        if (catalog) {
          // Check if all items in the request are present in the seller's catalog
          const invalidItems = items.filter(item => !catalog.Products.some(product => product.name === item.name));
  
          if (invalidItems.length === 0) {
            // Calculate total price based on the items in the catalog
            const totalPrice = items.reduce((acc, item) => {
              const product = catalog.Products.find(p => p.name === item.name);
              return acc + product.price * (item.quantity?item.quantity:1); 
            }, 0);
  
            // Create an order
            const order = new Order({
              buyerId: buyerId,
              sellerId: sellerId,
              products: items,
              totalAmount: totalPrice,
            });
  
            // Save the order to the database
            await order.save();
  
            res.status(201).json({ message: 'Order placed successfully', order ,success:true});
          } else {
            res.status(400).json({
              message: 'Invalid items in the order. Please check your items.',
              invalidItems: invalidItems,
              success:false
            });
          }
        } else {
          res.status(404).json({
            message: 'Catalog not found for the specified seller',
            success:false
          });
        }
      } else {
        res.status(404).json({
          message: 'Incorrect seller id or seller not found',
          success:false
        });
      }
    } catch (err) {
    //   console.error(err);
      res.status(500).json({
        message: 'Internal server error. Please try again later. or write the correct id',
        success: false,
      });
    }
  };
  


router.route('/create-order/:seller_id').post(auth,authorizeRole("buyer"),placeOrder);






module.exports=router;