/**
 * grunt-esdoc v0.0.4 build Aug 14 2017
 * https://github.com/cleversoap/grunt-esdoc
 * Copyright 2017 cleversoap, MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var esdoc = _interopDefault(require('esdoc'));
var path = _interopDefault(require('path'));

function registerESDocTask(grunt) {

			grunt.registerMultiTask("esdoc", "ES6 Documentation tool: ESDoc", function () {
						var options = this.options({
									coverage: true
						});

						var config = options.config !== undefined ? grunt.file.readJSON(options.config) : options;

						if (typeof config.destination !== "string") {

									grunt.fail.fatal("ESDoc requires the \"destination\" option to be set!");
						}

						if (grunt.option("debug") && grunt.option("verbose")) {

									config.debug = true;
						}

						var oldLog = console.log;

						try {
									var lines = [];

									console.log = function (msg) {

												lines.push(msg);

												if (grunt.option("verbose")) {

															oldLog.apply(console, arguments);
												}
									};

									esdoc.generate(config);

									var coveragePath = path.join(config.destination, "coverage.json");

									if (grunt.file.exists(coveragePath)) {

												var coverageReport = grunt.file.readJSON(coveragePath);
												var coverage = coverageReport.coverage;
												var expected = coverageReport.expectCount;
												var actual = coverageReport.actualCount;

												grunt.log[coverage < 100 ? "warn" : "ok"]("Coverage: " + coverage);
												grunt.log[actual < expected ? "warn" : "ok"]("Files: " + actual + "/" + expected);
									}
						} catch (error) {
									grunt.fail.fatal(error);
						} finally {
									console.log = oldLog;
						}
			});
}

module.exports = registerESDocTask;
