var Recipe = require('../models').Recipe;
var RecipeService = require('../services/recipe_service');
var RecipeSerializer = require('../serializers/recipe_serializer');
// var pry = require('pryjs');

module.exports = class RecipesSearchIndexFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static requestRecipes(food) {
    return new Promise((resolve, reject) => {
      food ?
      findOrRequestRecipes(food) :
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

function findOrRequestRecipes(food) {
  // eval(pry.it);
  // Just requests pending discussion with team regarding intent for storage
  return new Promise((resolve, reject) => {
    RecipeService.requestRecipesForFood(food)
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
