'use strict';

const contents = require('./data/20200421185017-add-contents.json');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('contents', contents);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('contents', {}, {});
    }
};
