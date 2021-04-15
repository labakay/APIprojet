const express = require('express');
const router = express.Router();
const product = require('../apollo/resolvers');

router.get('/products', product.Query);



module.exports = router;