var Recipe = require('../models').Recipe;
var Ingredient = require('../models').Ingredient;
var RecipeIngredient = require('../models').RecipeIngredient;
var Query = require('../models').Query;
var QueryRecipe = require('../models').QueryRecipe;
var RecipeService = require('../services/recipe_service');

module.exports = class RecipeHelper {
  static findOrRequestRecipes(food) {
    return new Promise((resolve, reject) => {
      Recipe.forQuery(food)
      .then(recipes => {
        if (recipes) {
          return recipes
        } else {
          return requestNewRecipes(food)
        }
      })
      .then(recipes => resolve(recipes))
      .catch(error => reject(error))
    })
  }
}

function requestNewRecipes(food) {
  return new Promise((resolve, reject) => {
    RecipeService.requestRecipesForFood(food)
    .then(request => createRecipesAndFoods(request))
    .then(recipes => createQueryRecipeAssociations(food, recipes))
    .then(() => Recipe.forQuery(food))
    .then(recipes => resolve(recipes))
    .catch(error => reject(error))
  })
}

function createRecipesAndFoods(request) {
  return Promise.all(request.map(function(recipe) {
    return createRecipeFromRequest(recipe);
  }))
}

function createRecipeFromRequest(request) {
  var newRecipe;
  return new Promise((resolve, reject) => {
    Promise.all([
      Recipe.fromRequest(request),
      Promise.all(request.recipe.ingredients.map(function(ingredient) {
        return Ingredient.fromRequest(ingredient);
      }))
    ])
    .then(function([recipe, ingredients]) {
      newRecipe = recipe;
      return createRecipeIngredientAssociations(recipe, ingredients, request)
    })
    .then(() => resolve(newRecipe))
    .catch(error => reject(error))
  })
}

function createRecipeIngredientAssociations(recipe, ingredients, request) {
  var recipeIngredients = []
  for (var i = 0; i < ingredients.length; i++) {
    recipeIngredients.push(RecipeIngredient.createAssociation(recipe, ingredients[i], request.recipe.ingredients[i].weight))
  }
  return Promise.all(recipeIngredients)
}

function createQueryRecipeAssociations(food, recipes) {
  return new Promise((resolve, reject) => {
    Query.create({term: food})
    .then(query => {
      Promise.all(recipes.map(function(recipe) {
        return QueryRecipe.create({
          QueryId: query.id,
          RecipeId: recipe.id
        })
      }))
    })
    .then(() => resolve())
    .catch(error => reject(error))
  })
}
