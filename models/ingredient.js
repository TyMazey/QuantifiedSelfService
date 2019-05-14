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

  Ingredient.fromRequest = function(request) {
    return new Promise((resolve, reject) => {
      Ingredient.findOrCreate({
        where: {
          name: request.text.slice(0, 70)
        }
      })
      .then(([ingredient]) => {
        resolve(ingredient)
      })
      .catch(error => reject(error))
    })
  }
  return Ingredient;
};
