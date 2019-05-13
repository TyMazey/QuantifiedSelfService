'use strict';
module.exports = (sequelize, DataTypes) => {
  const Query = sequelize.define('Query', {
    term: DataTypes.STRING
  }, {});
  Query.associate = function(models) {
    // associations can be defined here
  };
  return Query;
};