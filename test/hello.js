"use strict";
/**
 * @file hello test
 * @module timeout-request
 * @package timeout-request
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var timeout = require('../index.min.js'); // use require('timeout-request') instead
    var app = require('express')();
    var request = require('supertest');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * test module
 */
describe('app',function() {

    app.use(timeout({
        milliseconds: 1,
        callback: function(a) {

            console.log(a);
        },
        data: 'ciao',
    }));

    it('print - should print "ciao" to console',function(done) {

        request(app).get('/').expect(200).end(function(err,res) {

            done();
        });
    });

});
