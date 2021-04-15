const express = require('express');
const router = express.Router();
const userRouter = require('./users.route');
const orderRouter = require('./orders.route');

router.use(userRouter);
router.use(orderRouter);

module.exports = router;