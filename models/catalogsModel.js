    const mongoose=require('mongoose');
    const catalogSchema=new mongoose.Schema({
        sellerId:{
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
    module.exports=new mongoose.model('catalogs',catalogSchema);