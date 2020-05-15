'use strict';

const roles = require('./data/20200514161919-add-roles.json');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('roles', roles);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', {}, {});
    }
};
