const babel = require("rollup-plugin-babel");

module.exports = {

	options: {
		external: [
			"esdoc",
		],
		plugins: [
			babel()
		]
	},

	task: {
		options: {
			format: "cjs",
			moduleName: "<%= package.name.replace(/-/g, \"\").toUpperCase() %>",
			banner: "<%= banner %>"
		},
		src: "<%= package.module %>",
		dest: "tasks/<%= package.name %>.js"
	}

};
