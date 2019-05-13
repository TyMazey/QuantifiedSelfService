var Recipe = require('../models'.Recipe);
var RecipeService = require('../services/recipe_service');
var RecipeSerializer = require('../serializers/recipe_serializer');

module.exports = class RecipesSearchIndexFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static requestRecipes(location) {
    return new Promise((resolve, reject) => {
      location ?
      findOrRequestRecipes(location) :
      reject(new RecipesSearchIndexFacade(400, {error: "Food query parameter is required."}))
      .then(recipes => {
        resolve(new RecipesSearchIndexFacade(200, RecipeSerializer.formatAll(recipes)))
      })
      .catch(recipes => {
        reject(new RecipesSearchIndexFacade(400, {error: "Food query parameter is required."}))
      })
    })
  }
}

function findOrRequestRecipes(location) {
  // Just requests pending discussion with team regarding intent for storage
  return new Promise((resolve, reject) => {
    RecipeService.requestLocation(locaiton)
    .then(recipes => {
      return Recipe.fromRequest(recipes)
    })
    .then(recipes => {
      resolve(recipes)
    })
    .catch(error => {
      reject(error)
    })
  })
}
