# grunt-esdoc

[![Build status](https://travis-ci.org/cleversoap/grunt-esdoc.svg?branch=master)](https://travis-ci.org/cleversoap/grunt-esdoc)
[![npm version](https://badge.fury.io/js/grunt-esdoc.svg)](https://badge.fury.io/js/grunt-esdoc)
[![Dependencies](https://david-dm.org/cleversoap/grunt-esdoc.svg?branch=master)](https://david-dm.org/cleversoap/grunt-esdoc)

A Grunt plugin for the ES2015+ documentation tool [ESDoc](https://esdoc.org/).


## Getting Started

This plugin requires Grunt >= 0.4.0

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) 
guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. 
Once you're familiar with that process, you may install this plugin with this command:

```sh
npm install grunt-esdoc
``` 

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-esdoc");
```


## Usage

##### MyClass.js

```js
/**
 * Description of MyClass.
 */

export default class MyClass {

	/**
	 * Description of the method.
	 *
	 * @param {Number} param - Description of the parameter.
	 * @return {Number} Description of the return value.
	 */

	method(param) {}

}
```

##### Gruntfile.js

```js
grunt.initConfig({
	esdoc: {
		compile: {
			options: {
				source: "src",
				destination: "docs",
				plugins: [{"name": "esdoc-standard-plugin"}]
			}
		}
	}
});
```

Call the `esdoc` task to generate the documentation. Use `--verbose` to see all ESDoc log messages.

```bash
grunt esdoc [--verbose]
```

You may also integrate the task into your build sequence:

```js
grunt.registerTask("default", ["lint", "test", "esdoc"]);
```


## Configuration

All [ESDoc options](https://esdoc.org/manual/config.html) defined under `options` are passed to ESDoc.
You may also specify additional plugin-specific options:

| Option            | Description                                                                                                                     | Default |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------|---------|
| coverageThreshold | Affects the color of the coverage report in the console. Has no effect if coverage is not available. Expressed as a percentage. | 100.0 |
| verbose           | Enables exhaustive ESDoc logging.                                                                                               | false |

```js
grunt.initConfig({
	esdoc: {
		compile: {
			options: {
				verbose: true,
				coverageThreshold: 95.0,
				source: "./path/to/src",
				destination: "./path/to/esdoc/output",
				plugins: [{
					name: "esdoc-standard-plugin",
					option: {
						test: {
							source: "./test/",
							interfaces: ["suite", "test"],
							includes: ["(spec|Spec|test|Test)\\.js$"],
							excludes: ["\\.config\\.js$"]
						}
					}
				}]
			}
		}
	}
});
```

Alternatively, you can specify a `config` path to a file containing the configuration options for ESDoc.

##### esdoc.json

```js
{
	"coverageThreshold": 95.0,
	"source": "src",
	"destination": "docs",
	"plugins": [{"name": "esdoc-standard-plugin"}]
}
```

##### Gruntfile.js

```js
grunt.initConfig({
	esdoc: {
		compile: {
			options: {
				config: "esdoc.json"
			}
		}
	}
});
```


## Contributing

Maintain the existing coding style. Lint and test your code.


## Release History

 * _0.0.1_ First Release - using esdoc 0.1.4 and directly passing through options using the default publisher.
 * _0.0.2_ Using esdoc ~0.4.0 and updated the package metadata with relevant links.
 * _0.0.3_ Upgrade to at least node 4.0.0, upgrade to esdoc 0.4.7, cleaned up output to only show coverage by default.
 * _0.0.4_ Will now parse float percentages of coverage.
 * _1.0.0_ Most ESDoc features are now plugins. Check [here](https://esdoc.org/manual/migration.html) for more information.


## License

Copyright © 2016 Cleversoap.  
Licensed under the MIT license.
