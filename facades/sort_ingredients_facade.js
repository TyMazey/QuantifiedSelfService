var RecipeSerializer = require('../serializers/recipe_serializer');
var RecipeHelper = require('../helpers/recipe_helper');
var Recipe = require('../models').Recipe;

module.exports = class SortIngredientsFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static sortRecipes(search) {
    return new Promise((resolve, reject) => {
      lookupRecipes(search)
      .then(recipes => sortRecipesByIngredientCount(recipes))
      .then(sortedRecipes => RecipeSerializer.formatAll(sortedRecipes))
      .then(response => resolve(new SortIngredientsFacade(200, response)))
      .catch(error => reject(new SortIngredientsFacade(500, error)))
    })
  }
}

function lookupRecipes(search) {
  return new Promise((resolve, reject) => {
    search ?
    resolve(RecipeHelper.findOrRequestRecipes(search)) :
    resolve(Recipe.findAll({include: 'ingredients'}))
  })
};

// Sorting for endpoint done in action as couldn't immediately determine optimal non N+1 query for lookup.
function sortRecipesByIngredientCount(recipes) {
  return recipes.sort(function(recipeOne, recipeTwo) {
    return recipeOne.ingredients.length - recipeTwo.ingredients.length
  })
}
