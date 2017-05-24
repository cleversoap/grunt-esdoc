import esdoc from "esdoc";
import publisher from "esdoc/out/src/Publisher/publish";

/**
 * Registers the ESDoc Grunt task.
 *
 * @static
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
			const lines = [];

			console.log = function(msg) {

				lines.push(msg);

				if(grunt.option("verbose")) {

					oldLog.apply(console, arguments);

				}

			};

			// Pass the config to ESDoc to publish the documentation.
			esdoc.generate(config, publisher);

			const coverageRegExp = /^Coverage:\s*(\d{1,3}(?:\.\d{0,2}))%\s*\((\d+)\/(\d+)\)$/;

			/**
			 * Extracts the coverage values from the ESDoc log output.
			 *
			 * This goes in reverse (as coverage is near the end) and uses some() to
			 * iterate over the reversed lines until one matching the regex is found.
			 *
			 * @private
			 * @static
			 * @param {String} ln - A line of ESDoc's captured output.
			 */

			lines.reverse().some(function extractCoverage(ln) {

				const result = ln.match(coverageRegExp);

				if(result !== null) {

					const percent = parseFloat(result[1]);
					const amount = parseInt(result[2]);
					const total = parseInt(result[3]);

					grunt.log[percent < 100 ? "warn" : "ok"]("Coverage: " + percent + "%");
					grunt.log[amount < total ? "warn" : "ok"]("Files: " + amount + "/" + total);

				}

				return result;

			});

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
