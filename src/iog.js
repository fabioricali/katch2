const helpers = require('./helpers');
const write = require('./write');
const levels = require('./levels');
const Trace = require('./lib/errors');
const defaulty = require('defaulty');
const Flak = require('flak');

const DEFAULT_OPTS = {
    console: true,
    logging: true,
    autoDetect: true,
    writeFile: {
        prefix: '',
        humanize: true,
        folderPath: './logs'
    }
};

/**
 if (!(this instanceof Iog)) {
            return new Iog(opts);
        }**/

class Iog {

    constructor(opts) {

        /*if (!(this instanceof Iog)) {
            return new Iog(opts);
        }*/

        let me = this;

        Object.defineProperties(this, {
            _opts: {
                value: defaulty.copy(opts, DEFAULT_OPTS)
            },
            _emitter: {
                value: new Flak()
            }
        });

        if (this._opts.autoDetect) {
            if (helpers.isBrowser()) {
                window.onerror = function (msg, url, lineNo, columnNo, error) {
                    me.error(error, {
                        message: msg,
                        url: url,
                        lineNo: lineNo,
                        columnNo: columnNo
                    });
                }
            } else {
                process.on('uncaughtException', me.error);
            }
        }
    }

    error(error, params = {}) {
        /**
         * Throw error
         */
        this._emitter.fire('error', error, params);
        this._emitter.fire(`type${error.name}`, error, params);

        /* istanbul ignore else  */
        if (this._opts.console)
            console.error(error);

        write({
            level: 'ERROR',
            code: levels.ERROR.code,
            message: error.stack,
            params: params
        }, this._opts);
    }
}

module.exports = function(...args) {
    return new Iog(...args)
};