var RecipeHelper = require('../helpers/recipe_helper');
var Recipe = require('../models').Recipe;

module.exports = class SortIngredientsFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static sortRecipes(search) {
    return new Promise((resolve, reject) => {
      checkSearch(search)
      .then(response => resolve(new SortIngredientsFacade(200, response)))
      .catch(error => reject(new SortIngredientsFacade(500, error)))
    })
  }
}

function checkSearch(search) {
  return new Promise(function(resolve, reject) {
    search ?
    resolve(Recipe.sortAllByIngredients()) :
    resolve(sortSearchedIngredients(search))
  })
};

function sortSearchedIngredients(search) {
  return new Promise((resolve, reject) => {
    RecipeHelper.findOrRequestRecipes(search)
    .then(recipes => sortRecipesByIngredientCount(recipes))
    .then(sortedRecipes => resolve(sortedRecipes))
    .catch(error => reject(error))
  })
}

// Unsure if second query to sort on DB level is more efficient than sort on backend
function sortRecipesByIngredientCount(recipes) {
  return recipes.sort(function(recipeOne, recipeTwo) {
    return recipeOne.ingredients.length - recipeTwo.ingredients.length
  })
}
