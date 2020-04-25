'use strict';

const images = require('./data/20200421184927-add-images.json');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('images', images);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('images', {}, {});
    }
};
