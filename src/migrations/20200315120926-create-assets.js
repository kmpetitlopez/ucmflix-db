'use strict';
(function(module) {
    module.exports = {
        up: function(queryInterface, Sequelize) {
            return queryInterface.createTable('assets', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                path: {
                    type: Sequelize.STRING,
                    allowNull: false
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
            return queryInterface.dropTable('assets');
        }
    };
})(module);
