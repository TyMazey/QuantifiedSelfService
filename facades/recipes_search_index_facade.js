var RecipeSerializer = require('../serializers/recipe_serializer');
var RecipeHelper = require('../helpers/recipe_helper');

module.exports = class RecipesSearchIndexFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static requestRecipes(food) {
    return new Promise((resolve, reject) => {
      requireFood(food)
      .then(() => RecipeHelper.findOrRequestRecipes(food))
      .then(recipes => {
        resolve(new RecipesSearchIndexFacade(200, RecipeSerializer.formatAll(recipes)))
      })
      .catch(recipes => {
        reject(new RecipesSearchIndexFacade(400, {error: "Food query parameter is required."}))
      })
    })
  }
}

function requireFood(food) {
  return new Promise((resolve, reject) => {
    food ?
    resolve(food) :
    reject(new RecipesSearchIndexFacade(400, {error: "Food query parameter is required."}))
  })
}
