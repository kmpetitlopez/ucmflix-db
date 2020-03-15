'use strict';

const casual = require('casual'),
    moment=require('moment');

casual.define('vodEvent', (content) => {
    const startDate = casual.moment,
        duration = casual.integer(0, 1000);

    return {
        windowStartTime: startDate,
        windowEndTime: moment(startDate).add(duration, 'seconds'),

        // Associations
        content
    };
});

module.exports = casual.vodEvent;
