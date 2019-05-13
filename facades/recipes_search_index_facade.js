var Recipe = require('../models').Recipe;
var RecipeService = require('../services/recipe_service');
var RecipeSerializer = require('../serializers/recipe_serializer');

module.exports = class RecipesSearchIndexFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static requestRecipes(food) {
    return new Promise((resolve, reject) => {
      requireFood(food)
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
    resolve(findOrRequestRecipes(food)) :
    reject(new RecipesSearchIndexFacade(400, {error: "Food query parameter is required."}))
  })
}

function findOrRequestRecipes(food) {
  return new Promise((resolve, reject) => {
    Query.findOne({
      where: {name: food},
      include: "recipes"
    })
    .then(query => {
      query ? query.recipes : requestRecipes(food)
    })
    .then(recipes => {
      resolve(recipes);
    })
    .catch(error => {
      reject(error);
    })
  })
}

function  requestRecipes(food) {
  return new Promise(function(resolve, reject) {
    RecipeService.requestRecipesForFood(food)
    .then(recipes => {
      resolve(Recipe.fromRequest(recipes))
    })
    .catch(error => {
      reject(error)
    })
  })
}
