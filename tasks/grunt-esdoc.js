/**
 * grunt-esdoc v1.0.0 build Oct 29 2017
 * https://github.com/cleversoap/grunt-esdoc
 * Copyright 2017 cleversoap, MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var esdoc = _interopDefault(require('esdoc'));
var path = _interopDefault(require('path'));

function registerESDocTask(grunt) {

		grunt.registerMultiTask("esdoc", "ES6 Documentation tool: ESDoc", function () {
				var log = console.log;

				var options = this.options({
						coverageThreshold: 100.0,
						verbose: false,
						config: null,
						destination: null,
						source: null
				});

				if (options.config !== null) {

						Object.assign(options, grunt.file.readJSON(options.config));
				}

				if (!options.verbose && !grunt.option("verbose")) {
						console.log = function () {};
				}

				if (options.source === null) {

						grunt.fail.error("No source path specified");
				} else if (options.destination === null) {

						grunt.fail.error("No destination path specified");
				} else {

						try {

								esdoc.generate(options);

								var coveragePath = path.join(options.destination, "coverage.json");

								if (grunt.file.exists(coveragePath)) {

										var coverageReport = grunt.file.readJSON(coveragePath);
										var coverage = coverageReport.coverage;
										var expected = coverageReport.expectCount;
										var actual = coverageReport.actualCount;
										var unsatisfactory = coverage < options.coverageThreshold;

										grunt.log[unsatisfactory ? "warn" : "ok"]("Coverage: " + coverage);
										grunt.log[unsatisfactory ? "warn" : "ok"]("Files: " + actual + "/" + expected);
								}
						} catch (error) {

								grunt.fail.fatal(error);
						} finally {
								console.log = log;
						}
				}
		});
}

module.exports = registerESDocTask;
