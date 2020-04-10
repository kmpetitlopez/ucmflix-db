'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('contents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            title: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            description: {
                type: Sequelize.TEXT
            },
            year: {
                type: Sequelize.INTEGER
            },
            genre: {
                type: Sequelize.STRING
            },
            duration: {
                type: Sequelize.INTEGER
            },
            parentalRating: {
                type: Sequelize.STRING
            },
            country: {
                type: Sequelize.STRING
            },
            masterId: {
                references: {
                    model: 'contents',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
                type: Sequelize.INTEGER
            },
            episodeNumber: {
                type: Sequelize.INTEGER
            },
            seasonNumber: {
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
        return queryInterface.dropTable('contents');
    }
};
