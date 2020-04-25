'use strict';

const categoryReferences = require('./data/20200423183933-add-category-references.json');

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('categoryReferences', categoryReferences);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('categoryReferences', {}, {});
    }
};
