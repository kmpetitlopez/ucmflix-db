'use strict';

const casual = require('casual');

casual.define('role', function(users) {
    return {
        name: casual.name,

        // Associations
        users: users
    };
});

module.exports = casual.role;