'use strict';
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
    var timeout = require('../index.min.js'); // use
    // require('timeout-request')
    // instead
    var app = require('express')();
    var request = require('supertest');
    var assert = require('assert');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * test module
 */
describe('hello', function() {

    var data = 'ciao';
    before(function(done) {

        app.use(timeout({
            milliseconds: 10,
            callback: function(req, res, a) {

                res.send(a);
            },
            data: data,
        }));
        app.get('/', function(req, res) {

            // pass
        });
        done();
    });

    it('print - should return "ciao"', function(done) {

        request(app).get('/').expect(200).end(function(err, res) {

            assert.equal(res.text, data);
            done();
        });
    });
});
