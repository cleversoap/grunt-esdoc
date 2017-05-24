# grunt-esdoc

[![npm version](https://badge.fury.io/js/grunt-esdoc.svg)](https://badge.fury.io/js/grunt-esdoc)
[![Dependencies](https://david-dm.org/cleversoap/grunt-esdoc.svg?branch=master)](https://david-dm.org/cleversoap/grunt-esdoc)

A Grunt plugin for the ES6 documentation tool [ESDoc](https://esdoc.org/).


## Getting Started

This plugin requires Grunt >= 0.4.0

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) 
guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. 
Once you're familiar with that process, you may install this plugin with this command:

```sh
npm install grunt-esdoc --save-dev
``` 

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-esdoc");
```


## Usage

##### my-class.js

```javascript
/**
 * Description of MyClass.
 */
export default class MyClass {

	/**
	 * Description of method.
	 *
	 * @param {Number} param - Description of param.
	 * @return {Number} Description of the return value.
	 */
	method(param) {}

}
```

##### Gruntfile.js

```javascript
grunt.initConfig({
	esdoc: {
		compile: {
			options: {
				source: "src",
				destination: "docs"
			}
		}
	}
});
```

Call the ```esdoc``` task to generate the documentation. Use ```--verbose``` to see all ESDoc log messages.

```bash
grunt esdoc --verbose
```

You may also integrate the task into your build sequence:

```javascript
grunt.registerTask("default", ["lint", "test", "esdoc"]);
```


## Configuration

All [ESDoc config properties](https://esdoc.org/manual/configuration/config.html) are allowed under ```options```.

```javascript
grunt.initConfig({
	esdoc: {
		compile: {
			options: {
				source: "./path/to/src",
				destination: "./path/to/esdoc/output",
				includes: ["\\.(js|es6)$"],
				excludes: ["\\.config\\.(js|es6)$"],
				access: ["public", "protected"],
				autoPrivate: true,
				unexportIdentifier: false,
				undocumentIdentifier: true,
				builtinExternal: true,
				importPathPrefix: "",
				index: "./README.md",
				package: "./package.json",
				coverage: true,
				test: {
					type: "mocha",
					source: "./test/src",
					includes: ["Test\\.(js|es6)$"],
					excludes: ["\\.config\\.(js|es6)$"]
				}
				title: "My Software Name",
				styles: ["./path/to/style.css"],
				scripts: ["./path/to/script.js"],
				plugins: [{
					name: "plugin-name-or-file-path",
					option: null
				}],
				manual: {
					globalIndex: true,
					index: "./manual/index.md",
					asset: "./manual/asset",
					overview: ["./manual/overview.md"],
					design: ["./manual/design.md"],
					installation: ["./manual/installation.md"],
					usage: ["./manual/usage.md"],
					tutorial: ["./manual/tutorial.md"],
					configuration: ["./manual/configuration.md"],
					example: ["./manual/example.md"],
					advanced: ["./manual/advanced.md"],
					faq: ["./manual/faq.md"],
					changelog: ["./CHANGELOG.md"]
				},
				lint: true,
				experimentalProposal: {
					classProperties: true,
					objectRestSpread: true,
					decorators: true,
					doExpressions: true,
					functionBind: true,
					asyncGenerators: true,
					exportExtensions: true,
					dynamicImport: true
				}
			}
		}
	}
});
```

Alternatively, you can specify a ```config``` path to a file containing the configuration options for ESDoc.

##### esdoc.json

```javascript
{
	"source": "src",
	"destination": "docs"
}
```

##### Gruntfile.js

```javascript
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

Any contribution is welcome! Please check the [issues](https://github.com/cleversoap/grunt-esdoc/issues).


## Release History

 * _0.0.1_ First Release - using esdoc 0.1.4 and directly passing through options using the default publisher
 * _0.0.2_ Using esdoc ~0.4.0 and updated the package metadata with relevant links
 * _0.0.3_ Upgrade to at least node 4.0.0, upgrade to esdoc 0.4.7, cleaned up output to only show coverage by default
 * _0.0.4_ Will now parse float percentages of coverage


## License

Copyright (c) 2016 Cleversoap
Licensed under the MIT license.
