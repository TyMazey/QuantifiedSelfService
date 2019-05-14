var express = require('express');
var router = express.Router();
var SortCaloriesController = require('../../../controllers/sort_calories_controller');

/* GET recipes sorted by calories */
router.get('/calories', SortCaloriesController.index);

module.exports = router;
