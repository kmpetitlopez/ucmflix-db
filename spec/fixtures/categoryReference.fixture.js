'use strict';

const casual = require('casual');

casual.define('categoryReference', (category, content) => {
    return {
        // Associations
        category,
        content
    };
});

module.exports = casual.categoryReference;
