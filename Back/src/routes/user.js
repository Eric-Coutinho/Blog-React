const express = require('express');
const AuthController = require('../controller/userController');
const route = express.Router();

route
    .post('/login', AuthController.login)

module.exports = route;