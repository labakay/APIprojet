const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
//const verifyToken = require('../middlewares/verifyToken');

import verifyToken from "../middlewares/verifyToken";

router.post('/register', users.register);
router.post('/login', users.login);
router.get('/users', users.getAllUser);
router.get('/logout', users.logout);
router.get('/user/:id', verifyToken, users.getUser);
router.put('/user/:id', users.updateUser);


module.exports = router;
