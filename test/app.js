'use strict';
/**
 * @file app test
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

/*
 * test module
 */
describe('app', function() {

  var milliseconds = 800;
  var app;

  beforeEach(function(done) {

    app = express();
    done();
  });

  it('should get 200 after 800 milliseconds', function(done) {

    app.use(timeout({
      milliseconds: milliseconds
    })).get('/', function(req, res) {

      // pass
    });
    request(app).get('/').expect(200, done);
  });
  it('should get 200 after 800 milliseconds and after header', function(done) {

    app.use(timeout({
      header: true,
      milliseconds: milliseconds
    })).get('/', function(req, res) {

      // pass
    });
    request(app).get('/').expect(200, done);
  });
});
