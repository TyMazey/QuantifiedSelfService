var RecipesSearchIndexFacade = require('../facades/recipes_search_index_facade');

module.exports = class RecipesSearchController {
  static index(request, response) {
    response.setHeader('Content-Type', 'application/json');
    RecipesSearchIndexFacade.requestRecipes(request.query.food)
    .then(facade => {
      response.status(facade.status).send(facade.body);
    })
    .catch(facade => {
      response.status(facade.status).send(facade.body);
    })
  }
}
