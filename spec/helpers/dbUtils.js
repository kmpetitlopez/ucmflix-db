'use strict';

const db = require('../../src/index');

// eslint-disable-next-line require-jsdoc
async function cleanAll() {
    const options = {
            where: {},
            individualHooks: true
        },
        cleanups = [
            'content',
            'category',
            'role'
        ];

    for (const c of cleanups) {
        try {
            await db[c].destroy(options);
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = {
    cleanAll
};
