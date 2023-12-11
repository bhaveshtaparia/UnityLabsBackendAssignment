const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User (Buyer) model
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to the User (Seller) model
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default:1
        }
    }],
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    }
});

const Order = new mongoose.model('order', orderSchema);

module.exports = Order;
