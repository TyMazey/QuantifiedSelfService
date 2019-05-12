var express = require('express');
var router = require(express.Router());

/* GET recipes for search term */
router.get('/', RecipesSearchController.index);

module.exports = router;
