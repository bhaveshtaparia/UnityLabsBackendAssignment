const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    // seller id 
    sellerId:{
        type:string,
        required:true
    },

    // this is buyer id
    buyerId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },

    Products:[{
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }]
})
module.exports=new mongoose.model('orders',orderSchema);