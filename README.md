# grunt-esdoc

Grunt plugin for the ES6 documentation tool [ESDoc](https://esdoc.org/)

## Install

```bash
npm install grunt-esdoc --save-dev
```

## Documentation

### Configuration

Configure the plugin in your project's Gruntfile.js.

First, add the `esdoc` entry to the options of the `initConfig` method :

```javascript
grunt.initConfig({
    esdoc : {
        dist : {
            options: {
                source: './src',
                destination: './doc'
            }
        }
    }
});
```
Then, load the plugin

```javascript
grunt.loadNpmTasks('grunt-jsdoc');
```

All ESDoc config properties are allowed under options (see the
[ESDoc manual](https://esdoc.org/manual/config.html) for full details), for
example this is, at the time of writing, the [esdoc](/esdoc/esdoc) full
config with just the standard plugin:

```javascript
grunt.initConfig({
    "esdoc": {
        "source": "./src",
        "destination": "./docs",
        "includes": ["\\.js$"],
        "excludes": ["\\.config\\.js$"],
        "plugins": [{
            "name": "esdoc-standard-plugin",
            "option": {
                "lint": {"enable": true},
                "coverage": {"enable": true},
                "accessor": {"access": ["public", "protected", "private"], "autoPrivate": true},
                "undocumentIdentifier": {"enable": true},
                "unexportedIdentifier": {"enable": false},
                "typeInference": {"enable": true},
                "brand": {
                    "logo": "./logo.png",
                    "title": "My Library",
                    "description": "this is awesome library",
                    "repository": "https://github.com/foo/bar",
                    "site": "http://my-library.org",
                    "author": "https://twitter.com/foo",
                    "image": "http://my-library.org/logo.png"
                },
                "manual": {
                    "index": "./manual/index.md",
                    "globalIndex": true,
                    "asset": "./manual/asset",
                    "files": [
                        "./manual/overview.md"
                    ]
                },
                "test": {
                    "source": "./test/",
                    "interfaces": ["describe", "it", "context", "suite", "test"],
                    "includes": ["(spec|Spec|test|Test)\\.js$"],
                    "excludes": ["\\.config\\.js$"]
                }
            }
        }]
    }
});
```

Alternatively, you can pass
a `config` option instead that is a path to a file containing the configuration options for ESDoc.

```javascript
grunt.initConfig({
    esdoc : {
        dist : {
            options: {
                config: 'esdoc.json'
            }
        }
    }
});
```

### Build

To generate the documentation, you need to call the `esdoc` task :

```bash
$> grunt esdoc
```

or integrate it to your build sequence :

```javascript
grunt.registerTask('default', ['lint', 'test', 'esdoc']);
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
