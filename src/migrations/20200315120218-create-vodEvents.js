'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('vodEvents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            windowStartTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            windowEndTime: {
                type: Sequelize.DATE,
                allowNull: true
            },
            contentId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'contents',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
                allowNull: false
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
        return queryInterface.dropTable('vodEvents');
    }
};
