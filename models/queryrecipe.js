'use strict';
module.exports = (sequelize, DataTypes) => {
  const QueryRecipe = sequelize.define('QueryRecipe', {
    QueryId: DataTypes.INTEGER,
    RecipeId: DataTypes.INTEGER
  }, {});
  QueryRecipe.associate = function(models) {
    QueryRecipe.belongsTo(models.Query);
    QueryRecipe.belongsTo(models.Recipe);
  };
  return QueryRecipe;
};
