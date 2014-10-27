'use strict';
/**
 * @file timeout-request main
 * @module timeout-request
 * @package timeout-request
 * @subpackage main
 * @version 1.1.0
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

    var T;
    if (flag) {
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

            if (my.clear) {
                clearTimeout(T);
            }
            T = setTimeout(callback, my.milliseconds);
            return next ? next() : null;

            /**
             * callback timer
             * 
             * @function callback
             * @param {Object} res - response to client
             */
            function callback() {

                req.emit('emit', req, res);
                if (my.header) {
                    if (!res._headerSent) {
                        return my.callback(req, res, my.data);
                    }
                    return;
                }
                return my.callback(req, res, my.data);
            }
        };
    }

    /**
     * set timeout with res.end
     * 
     * @function timer
     * @param {Object} req - client request
     * @param {Object} res - response to client
     * @param {next} next - continue routes
     * @return {next}
     */
    return function timer(req, res, next) {

        if (my.clear) {
            clearTimeout(T);
        }
        T = setTimeout(callback, my.milliseconds);
        return next ? next() : null;

        /**
         * callback timer
         * 
         * @function callback
         * @param {Object} res - response to client
         */
        function callback() {

            req.emit('emit', req, res);
            if (my.header) {
                if (!res._headerSent) {
                    res.end();
                }
                res.end = function() {

                    return;
                };
                return;
            }
            res.end();
            res.end = function() {

                return;
            };
            return;
        }
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
        clear: options.clear === false ? false : true
    };
    if (options.callback) {
        my.callback = options.callback;
        my.data = options.data;
        return wrapper(my, true);
    }
    return wrapper(my, false);
}
module.exports = timeout;
