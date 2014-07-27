"use strict";
/**
 * @file hello example
 * @module timeout-request
 * @package timeout-request
 * @subpackage examples
 * @version 0.0.2
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/**
 * initialize module
 */
// import
try {
    var timeout = require('../index.min.js'); // use require('timeout-request') instead
    var app = require('express')();
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

// using middleware
app.use(timeout({
    clear: false,
    timeout: 1000,
    callback: function(a) {

        console.log(a);
    },
    data: 'ciao',
}));

// express routing
app.get('/',function(req,res) {

    res.send('hello world!');
});
// server starting
app.listen(3000);
console.log('starting server on port 3000');
