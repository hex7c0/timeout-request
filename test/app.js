'use strict';
/**
 * @file app test
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

    before(function(done) {

        app.use(timeout({
            milliseconds: 1000
        }));
        app.get('/',function(req,res) {

            // pass
        });
        done();
    });

    it('long - should get 200 after 1000 milliseconds',function(done) {

        request(app).get('/').expect(200,done);
    });
});
