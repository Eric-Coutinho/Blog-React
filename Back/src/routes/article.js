const express = require('express');
const ArticleController = require('../controller/articleController');
const route = express.Router();

route
    .post('/', ArticleController.create)
    .post('/like/:id', ArticleController.likeArticle);
    
module.exports = route;