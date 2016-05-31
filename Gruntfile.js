/*
* grunt-esdoc
*
* Copyright (c) 2015
* Licensed under the MIT license.
*/

'use strict';

var path = require('path');

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({

        esdoc: {
            dist: {
                options: {
                    config: 'test/esdoc.json'
                }
            }
        },

    });

    // Load task
    grunt.loadTasks('tasks');

    // Run Task
    grunt.registerTask('default', ['esdoc']);
};
