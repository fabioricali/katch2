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

function Iog(opts = {}) {

    if (!(this instanceof Iog)){
        return new Iog(opts);
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

Iog.prototype.log = (opts) => {

};
