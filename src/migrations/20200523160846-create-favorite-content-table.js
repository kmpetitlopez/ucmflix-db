'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('favoriteContents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            contentId: {
              type: Sequelize.INTEGER,
              allowNull: false,
              references: {
                  model: 'contents',
                  key: 'id'
              },
              onUpdate: 'cascade',
              onDelete: 'cascade'
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
      return queryInterface.dropTable('favoriteContents');
  }
};
