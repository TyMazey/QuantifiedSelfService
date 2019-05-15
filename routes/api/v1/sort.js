var express = require('express');
var router = express.Router();
var SortCaloriesController = require('../../../controllers/sort_calories_controller');
var SortTotalTimeController = require('../../../controllers/sort_total_time_controller');
var SortIngredientsController = require('../../../controllers/sort_ingredients_controller');

/* GET recipes sorted by calories */
router.get('/calories', SortCaloriesController.index);
/* GET recipes sorted by ingredient count */
router.get('/ingredients', SortIngredientsController.index);
/* GET recipes sorted by prep time */
router.get('/totalTime', SortTotalTimeController.index);

module.exports = router;
