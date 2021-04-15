const { gqlPluckFromCodeStringSync } = require('@graphql-tools/graphql-tag-pluck');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
}, { timestamps: true })


module.exports = mongoose.model('Product', productSchema);