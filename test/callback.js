'use strict';
/**
 * @file callback test
 * @module timeout-request
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var timeout = require('..');
var express = require('express');
var request = require('supertest');
var assert = require('assert');

/*
 * test module
 */
describe('callback', function() {

  var statusCode = 408;
  var milliseconds = 1500;
  var data = 'ciao';
  var app;

  beforeEach(function(done) {

    app = express();
    done();
  });

  it('should get 408 after 1500 milliseconds and print "ciao"', function(done) {

    app.use(timeout({
      milliseconds: milliseconds,
      data: data,
      callback: function(req, res, a) {

        res.status(statusCode).send(a);
      }
    })).get('/', function(req, res) {

      // pass
    });
    request(app).get('/').expect(statusCode).end(function(err, res) {

      assert.ifError(err);
      assert.equal(res.text, data);
      done();
    });
  });
  it('should get 408 after 1500 milliseconds, after header and print "ciao"',
    function(done) {

      app.use(timeout({
        header: true,
        milliseconds: milliseconds,
        data: data,
        callback: function(req, res, a) {

          res.status(statusCode).send(a);
        }
      })).get('/', function(req, res) {

        // pass
      });
      request(app).get('/').expect(statusCode).end(function(err, res) {

        assert.ifError(err);
        assert.equal(res.text, data);
        done();
      });
    });
});
