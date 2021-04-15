const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    amountTotal: {
        type: Number
    }
}, { timestamps: true } )


module.exports = mongoose.model('Order', orderSchema);