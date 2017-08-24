const babel = require("rollup-plugin-babel");

module.exports = {

	options: {
		external: [
			"esdoc",
			"path"
		],
		plugins: [
			babel()
		]
	},

	task: {
		options: {
			format: "cjs",
			banner: "<%= banner %>"
		},
		src: "<%= package.module %>",
		dest: "tasks/<%= package.name %>.js"
	}

};
