'use strict';
/**
 * @file timeout-request main
 * @module timeout-request
 * @package timeout-request
 * @subpackage main
 * @version 1.2.0
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

                req.emit('timeout', req, res);
                if (res._headerSent === false) {
                    return my.callback(req, res, my.data);
                }
                return;
            };
        } else {
            callback = function(req, res) {

                req.emit('timeout', req, res);
                return my.callback(req, res, my.data);
            };
        }
    } else {
        if (my.header) {
            callback = function(req, res) {

                req.emit('timeout', req, res);
                if (res._headerSent === false) {
                    res.end();
                    res.end = function() { // override

                        return;
                    };
                }
                return;
            };
        } else {
            callback = function(req, res) {

                req.emit('timeout', req, res);
                res.end();
                res.end = function() { // override

                    return;
                };
                return;
            };
        }
    }

    /**
     * set timeout with custom callback
     * 
     * @function timer
     * @param {Object} req - client request
     * @param {Object} res - response to client
     * @param {next} next - continue routes
     * @return {next}
     */
    return function timer(req, res, next) {

        setTimeout(callback.bind(this, req, res), my.milliseconds);
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
        milliseconds: Number(options.milliseconds) || 2000,
        header: Boolean(options.header),
    };
    if (options.callback) {
        my.callback = options.callback;
        my.data = options.data;
        return wrapper(my, true);
    }
    return wrapper(my, false);
}
module.exports = timeout;
