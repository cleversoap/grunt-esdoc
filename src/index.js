import esdoc from "esdoc";
import path from "path";

/**
 * Registers the ESDoc Grunt task.
 *
 * @param {Object} grunt - The Grunt instance.
 */

export default function registerESDocTask(grunt) {

	grunt.registerMultiTask("esdoc", "ES6 Documentation tool: ESDoc", function() {

		// Keep a reference to the original log function.
		const log = console.log;

		// Define defaults for plugin-specific options.
		const options = this.options({
			coverageThreshold: 100.0,
			verbose: false,
			config: null,
			destination: null,
			source: null
		});

		if(options.config !== null) {

			Object.assign(options, grunt.file.readJSON(options.config));

		}

		if(!options.verbose && !grunt.option("verbose")) {

			// Hack console.log to mute ESDoc's output.
			console.log = function() {};

		}

		if(options.source === null) {

			grunt.fail.error("No source path specified");

		} else if(options.destination === null) {

			grunt.fail.error("No destination path specified");

		} else {

			try {

				esdoc.generate(options);

				// Read the coverage results and report them via the console.
				const coveragePath = path.join(options.destination, "coverage.json");

				// Don't report coverage if it isn't available.
				if(grunt.file.exists(coveragePath)) {

					const coverageReport = grunt.file.readJSON(coveragePath);
					const coverage = coverageReport.coverage;
					const expected = coverageReport.expectCount;
					const actual = coverageReport.actualCount;
					const unsatisfactory = (Number.parseFloat(coverage.replace("%", "")) < options.coverageThreshold);

					grunt.log[unsatisfactory ? "warn" : "ok"]("Coverage: " + coverage);
					grunt.log[unsatisfactory ? "warn" : "ok"]("Files: " + actual + "/" + expected);

				}

			} catch(error) {

				grunt.fail.fatal(error);

			} finally {

				// Restore the log function.
				console.log = log;

			}

		}

	});

}
