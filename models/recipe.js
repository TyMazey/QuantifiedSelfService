'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    recipeUrl: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    totalTime: DataTypes.INTEGER
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
    return new Promise((resolve, reject) => {
      Recipe.findOrCreate({
        where: {
          name: request.recipe.label,
          imageUrl: request.recipe.image,
          recipeUrl: request.recipe.url,
          calories: parseInt(request.recipe.calories),
          totalTime: parseInt(request.recipe.totalTime)
        }
      })
      .then(function([recipe]) {
        resolve(recipe)
      })
      .catch(error => reject(error))
    })
  }


  Recipe.forQuery = function(request) {
    return new Promise((resolve, reject) => {
      Recipe.findAll({
        include: [{association: 'queries', where: {term: request}, required: true},
                   {association: 'ingredients'}]
      })
      .then((recipes) => {
        resolve(recipes)
      })
      .catch(error => {
        reject(error)
      })
    })
  }

  Recipe.forQueryAndSort = function(request, sortBy) {
    return Recipe.findAll({
      include: [{association: 'queries', where: {term: request}, required: true},
                 {association: 'ingredients'}],
      order: [
        [sortBy, 'ASC']
      ]
    })
  }

  Recipe.noQuerySort = function(sortBy) {
    return Recipe.findAll({
      include: [{association: 'ingredients'}],
      order: [
        [sortBy, 'ASC']
      ]
    })
  }

  return Recipe;
};
