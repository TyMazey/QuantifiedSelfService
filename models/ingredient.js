'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Recipe, {
      through: models.RecipeIngredient,
      as: 'recipes'
    })
  };
  return Ingredient;
};
