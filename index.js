'use strict';
/**
 * @file timeout-request main
 * @module timeout-request
 * @subpackage main
 * @version 1.4.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * functions
 */
/**
 * function wrapper for multiple require
 * 
 * @function wrapper
 * @param {Object} my - parsed options
 * @param {Boolear} flag - flag for custom callback
 * @return {Function}
 */
function wrapper(my, flag) {

  var callback;

  if (flag) {
    if (my.header) {
      callback = function(req, res) {

        var t = res._headerSent === false || res.finished === false;
        return t === true ? my.callback(req, res, my.data) : null;
      };
    } else {
      callback = function(req, res) {

        return my.callback(req, res, my.data);
      };
    }

  } else {
    var finale = function(req, res) {

      res.end();
      return req.socket.destroy();
    };
    if (my.header) {
      callback = function(req, res) {

        var t = res._headerSent === false || res.finished === false;
        return t === true ? finale(req, res) : null;
      };
    } else {
      callback = function(req, res) {

        return finale(req, res);
      };
    }
  }

  /**
   * set timeout as middleware with callback
   * 
   * @function timer
   * @param {Object} req - client request
   * @param {Object} res - response to client
   * @param {next} next - continue routes
   * @return {next}
   */
  return function timer(req, res, next) {

    req.timeout = setTimeout(callback.bind(this, req, res), my.milliseconds);

    // buff
    var destroy = req.socket.destroy;
    var end = res.end;

    // override
    req.socket.destroy = function() {

      clearTimeout(req.timeout);
      return destroy.call(this);
    };
    res.end = function(chunk, encoding) {

      clearTimeout(req.timeout);
      return end.call(this, chunk, encoding);
    };
    return next();
  };
}

/**
 * option setting
 * 
 * @exports timeout
 * @function timeout
 * @param {Object} opt - various options. Check README.md
 * @return {Function}
 */
function timeout(opt) {

  var options = opt || Object.create(null);
  var my = {
    milliseconds: Number(options.milliseconds) || 5000,
    header: Boolean(options.header),
  };
  if (typeof options.callback == 'function') {
    my.callback = options.callback;
    my.data = options.data;
    return wrapper(my, true);
  }
  return wrapper(my, false);
}
module.exports = timeout;
