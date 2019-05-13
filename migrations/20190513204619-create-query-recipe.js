'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('QueryRecipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      QueryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Queries',
          key: 'id'
        }
      },
      RecipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recipes',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('QueryRecipes');
  }
};
