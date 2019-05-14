var express = require('express');
var router = express.Router();
var RecipesSearchController = require('../../../controllers/recipes_search_controller');

/* GET recipes sorted by calories */
router.get('/calories', SortCaloriesController.index);

module.exports = router;
