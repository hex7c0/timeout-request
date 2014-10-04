'use strict';
/**
 * @file app example
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
    milliseconds: 1000
}));

// express routing
app.get('/',function(req,res) {

    // wait timeout-request callback
});
// server starting
app.listen(3000);
console.log('starting server on port 3000');
