# os-tmpdir

> Node.js [`os.tmpdir()`](https://nodejs.org/api/os.html#os_os_tmpdir) [ponyfill](https://ponyfill.com)

Use this instead of `require('os').tmpdir()` to get a consistent behavior on different Node.js versions \(even 0.8\).

## Install

```text
$ npm install --save os-tmpdir
```

## Usage

```javascript
const osTmpdir = require('os-tmpdir');

osTmpdir();
//=> '/var/folders/m3/5574nnhn0yj488ccryqr7tc80000gn/T'
```

## API

See the [`os.tmpdir()` docs](https://nodejs.org/api/os.html#os_os_tmpdir).

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)

