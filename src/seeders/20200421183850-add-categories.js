'use strict';

const categories = require('./data/20200421183850-add-categories.json'),
    moment = require('moment');

module.exports = {
    up: function(queryInterface, Sequelize) {
        categories.forEach((category) => {
            category.startDate = moment.utc().startOf('day').format('YYYY-MM-DD HH:mm');
        });

        return queryInterface.bulkInsert('categories', categories);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('categories', {}, {});
    }
};
