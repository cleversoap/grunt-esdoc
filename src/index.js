import esdoc from "esdoc";
import path from "path";

/**
 * Registers the ESDoc Grunt task.
 *
 * @param {Object} grunt - The Grunt instance.
 */

export default function registerESDocTask(grunt) {

	grunt.registerMultiTask("esdoc", "ES6 Documentation tool: ESDoc", function() {

		// Merge task-specific and/or target-specific options with these defaults.
		const options = this.options({
			coverage: true
		});

		const config = (options.config !== undefined) ? grunt.file.readJSON(options.config) : options;

		// Destination must be set.
		if(typeof config.destination !== "string") {

			grunt.fail.fatal("ESDoc requires the \"destination\" option to be set!");

		}

		/* If grunt.debug is set to true then override whatever the debug option is
		set to by any ESDoc config. */
		if(grunt.option("debug") && grunt.option("verbose")) {

			config.debug = true;

		}

		const oldLog = console.log;

		try {

			// Hack console.log to capture ESDoc's output.
			console.log = function() {

				if(grunt.option("verbose")) {

					oldLog.apply(console, arguments);

				}

			};

			// Pass the config to ESDoc to publish the documentation.
			esdoc.generate(config);

			// Read the coverage results and report them via the console.
			const coveragePath = path.join(config.destination, "coverage.json");

			if(grunt.file.exists(coveragePath)) {

				const coverageReport = grunt.file.readJSON(coveragePath);
				const coverage = coverageReport.coverage;
				const expected = coverageReport.expectCount;
				const actual = coverageReport.actualCount;

				grunt.log[(coverage < 100) ? "warn" : "ok"]("Coverage: " + coverage);
				grunt.log[(actual < expected) ? "warn" : "ok"]("Files: " + actual + "/" + expected);

			}

		} catch(error) {

			/* Fail on any error. Note that this will not reassign console.log as the
			entire grunt process will exit here anyway. */
			grunt.fail.fatal(error);

		} finally {

			// Restore console.log.
			console.log = oldLog;

		}

	});

}
