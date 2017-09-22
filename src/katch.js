const helpers = require('./helpers');
const Log = require('./log');
const levels = require('./levels');
const Trace = require('./lib/errors');
const defaulty = require('defaulty');

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

function Katch(opts = {}) {

    if (!(this instanceof Katch)){
        return new Katch(opts);
    }

    const me = this;

    Object.defineProperties(this, {
        opts: {
            value: defaulty.copy(opts, DEFAULT_OPTS)
        },
        log: {
            
        }
    });

    if (this.opts.autoDetect)
        if (helpers.isBrowser()) {
            window.onerror = function (msg, url, lineNo, columnNo, error) {
                me.log.error(error, {
                    message: msg,
                    url: url,
                    lineNo: lineNo,
                    columnNo: columnNo
                });
            }
        } else {
            process.on('uncaughtException', me.log.error);
        }
}

Katch.prototype.log = (opts) => {

};