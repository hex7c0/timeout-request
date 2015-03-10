'use strict';
/**
 * @file custom callback example
 * @module timeout-request
 * @subpackage examples
 * @version 0.0.2
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var timeout = require('..'); // use require('timeout-request') instead
var app = require('express')();

// using middleware
app.use(timeout({
  timeout: 1000,
  data: 'ciao',
  callback: function(req, res, a) {

    res.status(408).send('timeout'); // send timeout
    console.log(a); // print data ['ciao']
  }
}));

// express routing
app.get('/', function(req, res) {

  // wait timeout-request callback
});

// server starting
app.listen(3000);
console.log('starting server on port 3000');
