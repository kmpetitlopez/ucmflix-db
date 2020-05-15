'use strict';

const users = require('./data/20200514162246-add-users.json'),
    bcrypt = require('bcrypt'),
    saltRounds = 10;

module.exports = {
    up: function(queryInterface, Sequelize) {
        const newUsers = users.map((user) => {
            user.password = bcrypt.hashSync(user.password, saltRounds);
            return user;
        });

        return queryInterface.bulkInsert('users', newUsers);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', {}, {});
    }
};
