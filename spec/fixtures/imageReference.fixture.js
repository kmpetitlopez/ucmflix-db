'use strict';

const casual = require('casual');

casual.define('imageReference', (image, content) => {
    return {
        // Associations
        image,
        content
    };
});

module.exports = casual.imageReference;
