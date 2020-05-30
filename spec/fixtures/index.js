'use strict';

const glob = require('glob'),
    path = require('path');

glob.sync('./**/*.fixture.js', {follow: true}).forEach((file) => {
    var name = path.basename(file, '.fixture.js');
    module.exports[name] = require(path.resolve(file));
});
