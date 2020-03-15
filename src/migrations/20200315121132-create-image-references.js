'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('imageReferences', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            imageId: {
                allowNull: false,
                references: {
                    model: 'images',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
                type: Sequelize.INTEGER
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
    down: function(queryInterface/* , Sequelize*/) {
        return queryInterface.dropTable('imageReferences');
    }
};
