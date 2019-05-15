var SortCaloriesFacade = require('../facades/sort_calories_facade');

module.exports = class SortTotalTimeController {
  static index(request, response) {
    response.setHeader('Content-Type', 'application/json');
    SortCaloriesFacade.sortRecipes(request.query.food, 1)
    .then(responseObject => {
      response.status(responseObject.status).send(responseObject.body)
    })
    .catch(error => {
      response.status(error.status).send(error.body)
    })
  }
}
