'use strict';

const vodEvents = require('./data/20200423184756-add-vodEvents.json'),
    moment = require('moment');

module.exports = {
    up: function(queryInterface, Sequelize) {
        vodEvents.forEach((vodEvent) => {
            vodEvent.windowStartTime = moment.utc().startOf('day').format('YYYY-MM-DD HH:mm');
        });

        return queryInterface.bulkInsert('vodEvents', vodEvents);
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('vodEvents', {}, {});
    }
};
