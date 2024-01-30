const express = require('express');
const AuthorController = require('../controller/authorController');
const route = express.Router();

route
    .post('/', AuthorController.register)
    // .get('/:id', )

module.exports = route;