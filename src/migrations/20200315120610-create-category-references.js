'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('categoryReferences', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentId: {
                allowNull: false,
                references: {
                    model: 'contents',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
                type: Sequelize.INTEGER
            },
            categoryId: {
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable('categoryReferences');
    }
};
