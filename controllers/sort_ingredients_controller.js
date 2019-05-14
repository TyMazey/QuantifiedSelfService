var SortIngredientsFacade = require('../facades/sort_ingredients_facade');

module.exports = class SortIngredientsController {
  static index(request, response) {
    SortIngredientsFacade.sortRecipes(request.query.food)
    .then(facade => response.status(facade.status).send(facade.body))
    .catch(facade => response.status(facade.status).send(facade.body))
  }
}
