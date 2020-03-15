'use strict';

const casual = require('casual');

casual.define('image', (uri) => {
    return {
        aspectRatio: casual.integer(16, 8196),
        uri: uri || casual.url
    };
});

module.exports = casual.image;
