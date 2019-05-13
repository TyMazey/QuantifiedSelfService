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

function findOrCreateRecipe(recipe, model) {
  // Moved function outside as promise.all wasn't resolving correctly.
  return new Promise((resolve, reject) => {
    model.findOrCreate({
      where: {
        name: recipe.recipe.label,
        imageUrl: recipe.recipe.image,
        recipeUrl: recipe.recipe.url,
        calories: parseInt(recipe.recipe.calories)
      }
    })
    .then(([recipe, created]) => {
      resolve(recipe)
    })
    .catch(error => reject(error))
  })
}
