'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    recipeUrl: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
  };

  Recipe.fromRequest = function(request) {
    return Promise.all(request.map(function(recipe) {
      Recipe.findOrCreate({
        where: {
          name: recipe.recipe.label,
          imageUrl: recipe.recipe.image,
          recipeUrl: recipe.recipe.url,
          calories: recipe.recipe.calories
        }
      })
    }))
  }
  return Recipe;
};
