/*
* grunt-my-plugin
*
*
* Copyright (c) 2015
* Licensed under the MIT license.
*/

"use strict";

var esdoc = require(`esdoc`);
var publisher = require(`esdoc/out/src/Publisher/publish`);

module.exports = function (grunt) {

    grunt.registerMultiTask(`esdoc`, `ES6 Documentation tool ESDoc Grunt Plugin`, function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            coverage: true
        });

        var config = {};

        if (typeof options.config !== `undefined`) {
            config = grunt.file.readJSON(options.config);
        } else {
            config = options;
        }

        // Destination must be set
        if (typeof config.destination !== `string`) {
            grunt.fail.fatal(`ESDoc requires "destination" option be set`);
        }

        // If grunt.debug is set to true then override whatever the debug
        // option is set to by any esdoc config
        if (grunt.option(`debug`) && grunt.option(`verbose`)) {
            config.debug = true;
        }

        const oldLog = console.log;

        try {

            // Capture console.log to filter output
            // If in verbose mode then log the lines that are output
            const lines = [];
            console.log = function (msg) {
                lines.push(msg);

                if (grunt.option(`verbose`)) {
                    oldLog.apply(console, arguments);
                }
            }

            // Pass the config to ESDoc to publish the documentation
            esdoc.generate(config, publisher);

            // If coverage is configured then parse out the coverage values
            // This goes in reverse (as coverage is near the end) and uses
            // some to iterate over the reversed lines until one matching
            // the regex is found
            lines.reverse().some((ln, m) => {
                if (m = ln.match(/^Coverage:\s*(\d{1,3})%\s*\((\d+)\/(\d+)\)$/)) {
                    const percent = parseInt(m[1]);
                    const amount = parseInt(m[2]);
                    const total = parseInt(m[3]);

                    grunt.log[percent < 100 ? `warn` : `ok`](`Coverage: ${percent}%`);
                    grunt.log[amount < total ? `warn` : `ok`](`Files: ${amount}/${total}`);
                }
                return m;
            });

        } catch (err) {

            // Fail on any error
            // Note that this will not reassign console.log as the entire
            // grunt process will exit here
            grunt.fail.fatal(err);

        } finally {

            // Return control of console.log to normal
            console.log = oldLog;

        }
    });

};
