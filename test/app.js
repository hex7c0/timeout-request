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
  var timeout = require('..');
  var express = require('express');
  var request = require('supertest');
} catch (MODULE_NOT_FOUND) {
  console.error(MODULE_NOT_FOUND);
  process.exit(1);
}

/*
 * test module
 */
describe('app', function() {

  it('should get 200 after 800 milliseconds', function(done) {

    var app = express();
    app.use(timeout({
      milliseconds: 800
    }));
    app.get('/', function(req, res) {

      // pass
    });
    request(app).get('/').expect(200, done);
  });
  it('should get 200 after 800 milliseconds after header', function(done) {

    var app = express();
    app.use(timeout({
      header: true,
      milliseconds: 800
    }));
    app.get('/', function(req, res) {

      // pass
    });
    request(app).get('/').expect(200, done);
  });
});
