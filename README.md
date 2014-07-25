#timeout-request [![Build Status](https://travis-ci.org/hex7c0/timeout-request.svg?branch=master)](https://travis-ci.org/hex7c0/timeout-request) [![NPM version](https://badge.fury.io/js/timeout-request.svg)](http://badge.fury.io/js/timeout-request)

set the number of milliseconds a script is allowed to run in [nodejs](http://nodejs.org/). If this is reached, `res.end()` will be call or custom callback.
Emit `timeout` with '(req,res)'

## Installation

Install through NPM

```
npm install timeout-request
```
or
```
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

 - `milliseconds` - **Number** Number of milliseconds before call callback *(default "2000")*
 - `header` - **Boolean** If enabled, check `res._header` before call callback *(default "false")*
 - `clear` - **Boolean** Stop a timer that was previously created. Otherwise multiple callback will be run *(default "true")*
 - `callback` - **Function** Custom callback instead of `res.end` *(default "null")*
 - `data` - **Object** Object passed to custom callback *(default "null")*

#### Examples

Take a look at my [examples](https://github.com/hex7c0/timeout-request/tree/master/examples)

## License
Copyright (c) 2014 hex7c0

Licensed under the GPLv3 license
