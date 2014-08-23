"use strict";
/**
 * @file timeout-request main
 * @module timeout-request
 * @package timeout-request
 * @subpackage main
 * @version 1.1.3
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * functions
 */
/**
 * end of work
 * 
 * @param {next} [next] - continue routes
 * @return {next}
 */
function end(next) {

    if (next) {
        return next();
    }
    return;
}

/**
 * function wrapper for multiple require
 * 
 * @function wrapper
 * @param {Object} options - parsed options
 * @param {Boolear} flag - flag for custom callback
 * @return {Function}
 */
function wrapper(options, flag) {

    var my = options;
    var T;

    if (options.callback) {
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

            var opt = my;
            if (opt.clear) {
                clearTimeout(T);
            }
            T = setTimeout(callback, opt.milliseconds);

            /**
             * callback timer
             * 
             * @function callback
             * @param {Object} res - response to client
             */
            function callback() {

                req.emit('emit', req, res);
                if (opt.header) {
                    if (!res._headerSent) {
                        return opt.callback(opt.data);
                    }
                    return;
                }
                return opt.callback(opt.data);
            }

            return end(next);
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

        var opt = my;
        if (opt.clear) {
            clearTimeout(T);
        }
        T = setTimeout(callback, opt.milliseconds);

        /**
         * callback timer
         * 
         * @function callback
         * @param {Object} res - response to client
         */
        function callback() {

            req.emit('emit', req, res);
            if (opt.header) {
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

        return end(next);
    };
}

/**
 * option setting
 * 
 * @exports timeout
 * @function timeout
 * @param {Object} options - various options. Check README.md
 * @return {Function}
 */
module.exports = function timeout(options) {

    var options = options || Object.create(null);
    var my = {
        milliseconds: Number(options.milliseconds) || 2000,
        header: Boolean(options.header),
        clear: options.clear == false ? false : true
    };
    if (options.callback) {
        my.callback = options.callback;
        my.data = options.data;
        return wrapper(my, true);
    }
    return wrapper(my, false);
};
