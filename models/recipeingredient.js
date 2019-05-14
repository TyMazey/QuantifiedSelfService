'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeIngredient = sequelize.define('RecipeIngredient', {
    IngredientId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  RecipeIngredient.associate = function(models) {
    RecipeIngredient.belongsTo(models.Recipe);
    RecipeIngredient.belongsTo(models.Ingredient);
  };

  RecipeIngredient.createAssociation = function(recipe, ingredient, weight) {
    return new Promise((resolve, reject) => {
      RecipeIngredient.findOrCreate({
        where: {
          RecipeId: recipe.id,
          IngredientId: ingredient.id,
          quantity: parseInt(weight)
        }
      })
      .then(recipeIngredient => resolve(recipeIngredient))
      .catch(error => reject(error))
    })
  }
  return RecipeIngredient;
};
