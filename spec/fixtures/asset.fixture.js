'use strict';

const casual = require('casual');

casual.define('asset', (content) => {
    return {
        path: casual.word,

        // Associations
        content
    };
});

module.exports = casual.asset;
