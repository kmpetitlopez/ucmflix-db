'use strict';

const casual = require('casual');

casual.define('favoriteContent', (user, content) => {
    return {
        // Associations
        user,
        content
    };
});

module.exports = casual.favoriteContent;
