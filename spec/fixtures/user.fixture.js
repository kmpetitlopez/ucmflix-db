'use strict';

const casual = require('casual');

casual.define('user', function(roles) {
    return {
        username: casual.name,
        email: casual.email,
        password: casual.word,

        // Associations
        roles: roles
    };
});

module.exports = casual.user;
