'use strict';
module.exports = (sequelize, DataTypes) => {
  const Query = sequelize.define('Query', {
    term: DataTypes.STRING
  }, {});
  Query.associate = function(models) {
    Query.belongsToMany(models.Recipe, {
      through: models.QueryRecipe,
      as: 'recipes'
    })
  };
  return Query;
};
