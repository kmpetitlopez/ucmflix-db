'use strict';

const casual = require('casual'),
    moment = require('moment');

casual.define('category', (name) => {
    const startDate = casual.moment,
        duration = casual.integer(0, 1000);

    return {
        name: name || casual.word,
        startDate,
        endDate: moment(startDate).add(duration, 'seconds')
    };
});

module.exports = casual.category;
