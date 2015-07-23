/*
* grunt-esdoc
*
* Copyright (c) 2015
* Licensed under the MIT license.
*/

'use strict';

var path = require('path');

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        esdoc: {
            dist: {
                options: {
                    config: 'test/esdoc.json'
                }
            }
        },

        clean: {
            dist: [ path.resolve('test','doc') ]
        }

    });

    // Load task
    grunt.loadTasks('tasks');

    // Tasks
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Run Task
    grunt.registerTask('default', ['esdoc']);
};
