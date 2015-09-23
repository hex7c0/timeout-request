'use strict';
/**
 * @file app example
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
  milliseconds: 1000, // close socket after 1 sec
})).get('/', function(req, res) { // express routing

  // wait timeout-request callback
}).listen(3000);
console.log('starting server on port 3000');
