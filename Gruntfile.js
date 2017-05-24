const loadGruntConfig = require("load-grunt-config");
const path = require("path");

module.exports = function(grunt) {

	const date = grunt.template.today("mmm dd yyyy");

	// Load the implemented Grunt task.
	grunt.loadTasks("tasks");

	loadGruntConfig(grunt, {

		configPath: path.join(process.cwd(), "grunt/config"),

		jitGrunt: {
			customTasksDir: "grunt/tasks"
		},

		data: {
			banner: "/**\n" +
				" * <%= package.name %> v<%= package.version %> build " + date + "\n" +
				" * <%= package.homepage %>\n" +
				" * Copyright " + date.slice(-4) + " <%= package.author.name %>, <%= package.license %>\n" +
				" */\n"
		}

	});

};
