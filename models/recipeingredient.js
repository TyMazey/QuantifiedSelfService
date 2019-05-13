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
  return RecipeIngredient;
};
