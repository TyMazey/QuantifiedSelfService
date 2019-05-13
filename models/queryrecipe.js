'use strict';
module.exports = (sequelize, DataTypes) => {
  const QueryRecipe = sequelize.define('QueryRecipe', {
    queryId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {});
  QueryRecipe.associate = function(models) {
    // associations can be defined here
  };
  return QueryRecipe;
};