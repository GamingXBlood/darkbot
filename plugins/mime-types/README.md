# mime-types

[![](https://badgen.net/npm/v/mime-types)](https://npmjs.org/package/mime-types) [![](https://badgen.net/npm/dm/mime-types)](https://npmjs.org/package/mime-types) [![](https://badgen.net/npm/node/mime-types)](https://nodejs.org/en/download) [![](https://badgen.net/travis/jshttp/mime-types/master)](https://travis-ci.org/jshttp/mime-types) [![](https://badgen.net/coveralls/c/github/jshttp/mime-types/master)](https://coveralls.io/r/jshttp/mime-types?branch=master)

The ultimate javascript content-type utility.

Similar to [the `mime@1.x` module](https://www.npmjs.com/package/mime), except:

* **No fallbacks.** Instead of naively returning the first available type,

  `mime-types` simply returns `false`, so do

  `var type = mime.lookup('unrecognized') || 'application/octet-stream'`.

* No `new Mime()` business, so you could do `var lookup = require('mime-types').lookup`.
* No `.define()` functionality
* Bug fixes for `.lookup(path)`

Otherwise, the API is compatible with `mime` 1.x.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/). Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install mime-types
```

## Adding Types

All mime types are based on [mime-db](https://www.npmjs.com/package/mime-db), so open a PR there if you'd like to add mime types.

## API

```javascript
var mime = require('mime-types')
```

All functions return `false` if input is invalid or not found.

### mime.lookup\(path\)

Lookup the content-type associated with a file.

```javascript
mime.lookup('json') // 'application/json'
mime.lookup('.md') // 'text/markdown'
mime.lookup('file.html') // 'text/html'
mime.lookup('folder/file.js') // 'application/javascript'
mime.lookup('folder/.htaccess') // false

mime.lookup('cats') // false
```

### mime.contentType\(type\)

Create a full content-type header given a content-type or extension. When given an extension, `mime.lookup` is used to get the matching content-type, otherwise the given content-type is used. Then if the content-type does not already have a `charset` parameter, `mime.charset` is used to get the default charset and add to the returned content-type.

```javascript
mime.contentType('markdown') // 'text/x-markdown; charset=utf-8'
mime.contentType('file.json') // 'application/json; charset=utf-8'
mime.contentType('text/html') // 'text/html; charset=utf-8'
mime.contentType('text/html; charset=iso-8859-1') // 'text/html; charset=iso-8859-1'

// from a full path
mime.contentType(path.extname('/path/to/file.json')) // 'application/json; charset=utf-8'
```

### mime.extension\(type\)

Get the default extension for a content-type.

```javascript
mime.extension('application/octet-stream') // 'bin'
```

### mime.charset\(type\)

Lookup the implied default charset of a content-type.

```javascript
mime.charset('text/markdown') // 'UTF-8'
```

### var type = mime.types\[extension\]

A map of content-types by extension.

### \[extensions...\] = mime.extensions\[type\]

A map of extensions by content-type.

## License

[MIT](https://github.com/GamingXBlood/darkbot/tree/f9e31883d400da8a46698bbabbd10b1696eccf00/node_modules/mime-types/LICENSE/README.md)

