/**
 * grunt-esdoc v0.0.4 build May 24 2017
 * https://github.com/cleversoap/grunt-esdoc
 * Copyright 2017 cleversoap, MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var esdoc = _interopDefault(require('esdoc'));
var publisher = _interopDefault(require('esdoc/out/src/Publisher/publish'));

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

									esdoc.generate(config, publisher);

									var coverageRegExp = /^Coverage:\s*(\d{1,3}(?:\.\d{0,2}))%\s*\((\d+)\/(\d+)\)$/;

									lines.reverse().some(function extractCoverage(ln) {

												var result = ln.match(coverageRegExp);

												if (result !== null) {

															var percent = parseFloat(result[1]);
															var amount = parseInt(result[2]);
															var total = parseInt(result[3]);

															grunt.log[percent < 100 ? "warn" : "ok"]("Coverage: " + percent + "%");
															grunt.log[amount < total ? "warn" : "ok"]("Files: " + amount + "/" + total);
												}

												return result;
									});
						} catch (error) {
									grunt.fail.fatal(error);
						} finally {
									console.log = oldLog;
						}
			});
}

module.exports = registerESDocTask;
