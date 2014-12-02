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
  var timeout = require('..');
  var express = require('express');
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

  it('should return "ciao"', function(done) {

    var app = express();
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
    request(app).get('/').expect(200).end(function(err, res) {

      if (err)
        throw err;
      assert.equal(res.text, data);
      done();
    });
  });
  it('should return "ciao" after header', function(done) {

    var app = express();
    app.use(timeout({
      header: true,
      milliseconds: 10,
      callback: function(req, res, a) {

        res.send(a);
      },
      data: data,
    }));
    app.get('/', function(req, res) {

      // pass
    });
    request(app).get('/').expect(200).end(function(err, res) {

      if (err)
        throw err;
      assert.equal(res.text, data);
      done();
    });
  });
});
