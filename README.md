# [timeout-request](https://github.com/hex7c0/timeout-request)

[![NPM version](https://img.shields.io/npm/v/timeout-request.svg)](https://www.npmjs.com/package/timeout-request)
[![Linux Status](https://img.shields.io/travis/hex7c0/timeout-request.svg?label=linux-osx)](https://travis-ci.org/hex7c0/timeout-request)
[![Windows Status](https://img.shields.io/appveyor/ci/hex7c0/timeout-request.svg?label=windows)](https://ci.appveyor.com/project/hex7c0/timeout-request)
[![Dependency Status](https://img.shields.io/david/hex7c0/timeout-request.svg)](https://david-dm.org/hex7c0/timeout-request)
[![Coveralls](https://img.shields.io/coveralls/hex7c0/timeout-request.svg)](https://coveralls.io/r/hex7c0/timeout-request)

Set the number of milliseconds that a script is allowed to run in [nodejs](http://nodejs.org/).
If this timeout is reached, `res.end()` or custom callback will be called

## Installation

Install through NPM

```bash
npm install timeout-request
```
or
```bash
git clone git://github.com/hex7c0/timeout-request.git
```

## API

inside expressjs project
```js
var timeout = require('timeout-request');

var app = require('express')();

app.use(timeout());
```

### timeout(options)

#### options

 - `milliseconds` - **Number** Number of milliseconds before callback *(default "5000")*
 - `header` - **Boolean** If enabled, check `res._header` before callback *(default "false")*
 - `data` - **Object** Object passed to custom callback after `req` and `res` *(default "null")*
 - `callback` - **Function** Custom callback instead of `res.end` *(default "null")*

## Examples

Take a look at my [examples](examples)

### [License GPLv3](LICENSE)
