/* eslint no-invalid-this: 0 */

'use strict';

module.exports = function(grunt) {
    grunt.registerTask('resetdb', 'This task drops current schema and it creates it again', function() {
        var exec = require('child_process').exec,
            done = this.async();

        exec('mysql -u root -p < scripts/reset_database.sql', function(error) {
            if (error) {
                grunt.log.error('\'scripts/reset_database.sql\' wasn\'t found or it contains errors');
                done(false);
            } else {
                grunt.log.writeln('Database schema recreated successfully!');
                done(true);
            }
        });
    });
};
