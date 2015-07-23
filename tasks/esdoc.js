/*
* grunt-my-plugin
*
*
* Copyright (c) 2015
* Licensed under the MIT license.
*/

'use strict';

var esdoc = require('esdoc');
var publisher = require('esdoc/out/src/Publisher/publish');

module.exports = function (grunt) {

    grunt.registerMultiTask('esdoc', 'ES6 Documentation tool ESDoc Grunt Plugin', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({});

        var config = {};

        if (typeof options.config !== 'undefined') {
            config = grunt.file.readJSON(options.config);
        } else {
            config = options;
        }

        esdoc.generate(config, publisher);

    });

};
