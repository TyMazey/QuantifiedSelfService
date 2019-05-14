var SortFacade = require('../facades/sort_facade');

module.exports = class SortCaloriesController {
  static index(request, response) {
    response.setHeader('Content-Type', 'application/json');
    SortFacade.sortRecipes(request.query.food)
    .then(response => {
      response.status(response.status).send(response.body)
    })
    .catch(error => {
      response.status(error.status).send(error.body)
    })
  }
}
