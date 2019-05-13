var pry = require('pryjs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    recipeUrl: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Recipe.associate = function(models) {
    Recipe.belongsToMany(models.Query, {
      through: models.QueryRecipe,
      as: 'queries'
    })
    Recipe.belongsToMany(models.Ingredient, {
      through: models.RecipeIngredient,
      as: 'ingredients'
    })
  };

  Recipe.fromRequest = function(request) {
    return Promise.all(request.map(function(recipe) {
      return findOrCreateRecipe(recipe, Recipe)
    }))
  }

  return Recipe;
};

function findOrCreateRecipe(request, model) {
  // Moved function outside as promise.all wasn't resolving correctly.
  return new Promise((resolve, reject) => {
    createRecipeIngredients(request, model)
    .then(function(recipes) {
      resolve(recipes)
    })
    .catch(error => reject(error))
  })
}

function createRecipeIngredients(request, Recipe) {
  var Ingredient = require('../models').Ingredient;
  return new Promise((resolve, reject) => {
    Promise.all([
      Recipe.findOrCreate({
        where: {
          name: request.recipe.label,
          imageUrl: request.recipe.image,
          recipeUrl: request.recipe.url,
          calories: parseInt(request.recipe.calories)
        }
      }),
      Promise.all([
        request.recipe.ingredients.map(function(ingredient) {
          return Ingredient.findOrCreate({
            where: {
              name: ingredient.text
            }
          })
        })
      ])
    ])
    .then(([recipe, ingredients]) => {
      Promise.all(ingredients[0])
      .then((ingredients) => {
        return createRecipeIngredientAssociations(recipe[0], ingredients[0], request)
      })
      .then(() => {
        resolve(recipe[0])
      })
    })
    .catch(error => {
    })
  })
}

function createRecipeIngredientAssociations(recipe, ingredients, request) {
  var RecipeIngredient = require('../models').RecipeIngredient;
  var recipeIngredientArray = [];
  for(var i = 0; i < ingredients.length; i++) {
    recipeIngredientArray.push(RecipeIngredient.findOrCreate({
      where: {
        RecipeId: recipe.id,
        IngredientId: ingredients[i].id,
        quantity: parseInt(request.recipe.ingredients[i].weight)
      }
    }))
  return Promise.all(recipeIngredientArray);
  }
}
