var SortFacade = require('../facades/sort_facade');

module.exports = class SortTotalTimeController {
  static index(request, response) {
    response.setHeader('Content-Type', 'application/json');
    SortFacade.sortRecipes(request.query.food, 1)
    .then(responseObject => {
      response.status(responseObject.status).send(responseObject.body)
    })
    .catch(error => {
      response.status(error.status).send(error.body)
    })
  }
}
