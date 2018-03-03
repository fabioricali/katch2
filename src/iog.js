const extend = require('defaulty');
const mkdirp = require('mkdirp');
const dateFormat = require('dateformat');
const fs = require('fs');
const isError = require('is-error');

/**
 * @typedef SEPARATOR
 * @type {string}
 * @ignore
 */
const SEPARATOR = '\n\n---------------------------------------------------------------------------------------\n\n';

/**
 * @class
 */
class Iog {

    /**
     * Iog instance
     * @param {string} contextName es. your-module-name
     * @param {object} [opts] options
     * @param {string} [opts.path=] log path
     * @param {string} [opts.logExt=.log] log file extension
     * @param {string} [opts.separator=---] log separator
     * @param {boolean} [opts.console=true] show log in console
     */
    constructor(contextName, opts = {}) {

        if (typeof contextName === 'undefined')
            throw new TypeError('context name is required');

        this.contextName = contextName;
        this.opts = extend(opts, {
            path: '',
            logExt: '.log',
            separator: SEPARATOR,
            console: true
        });

        if (this.opts.path) {
            mkdirp.sync(this.opts.path);
        }

        this.filePath = `${this.opts.path}/${this.contextName}${this.opts.logExt}`
    }

    /**
     * Write log
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     * @param {string} [type=log] any type that you want like: log, info, error, trace, warn also custom
     * @param {boolean} [show=true] disable console for single write
     */
    write(msg = '', type = 'log', show = true) {

        if (typeof msg === 'object' && !isError(msg))
            msg = JSON.stringify(msg, null, 2);

        const now = new Date();

        let date = dateFormat(now, 'yyyy-mm-dd HH:MM:ss:l');

        let body = `CONTEXT: ${this.contextName}\nDATE: ${date}\nTYPE: ${type}\nBODY:\n\n${msg}${this.opts.separator}`;

        if (this.opts.console && show) {
            console[type in console ? type : 'log'](body);
        }

        fs.appendFile(this.filePath, body, (err) => {
            if (err) throw err;
        });
    }

    /**
     * A wrapper of write that set type to "error"
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     */
    error(msg = '') {
        this.write(msg, 'error');
    }

    /**
     * A wrapper of write that set type to "warn"
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     */
    warn(msg = '') {
        this.write(msg, 'warn');
    }

    /**
     * A wrapper of write that set type to "info"
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     */
    info(msg = '') {
        this.write(msg, 'info');
    }

    /**
     * A wrapper of write that set type to "trace"
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     */
    trace(msg = '') {
        this.write(msg, 'trace');
    }
}

module.exports = Iog;