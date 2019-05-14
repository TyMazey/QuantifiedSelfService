var SortCaloriesFacade = require('../facades/sort_calories_facade');

module.exports = class SortCaloriesController {
  static index(request, response) {
    response.setHeader('Content-Type', 'application/json');
    SortCaloriesFacade.sortRecipes(request.query.food)
    .then(responseObject => {
      response.status(responseObject.status).send(responseObject.body)
    })
    .catch(error => {
      response.status(error.status).send(error.body)
    })
  }
}
