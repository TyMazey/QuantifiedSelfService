var express = require('express');
var router = require(express.Router());
var RecipesSearchController = require('../../../controllers/recipes_search_controller');

/* GET recipes for search term */
router.get('/', RecipesSearchController.index);

module.exports = router;
