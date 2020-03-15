'use strict';

module.exports = require('./models/index')(process.env.CONFIG_FILE);
module.exports.constants = require('./utils/constants');
