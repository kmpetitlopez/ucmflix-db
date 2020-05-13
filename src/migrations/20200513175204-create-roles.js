'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('roles', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          name: {
              allowNull: false,
              type: Sequelize.STRING,
              unique: true
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
  down: function(queryInterface) {
      return queryInterface.dropTable('roles');
  }
};
