const be = require('bejs');
const Iog = require('../');

describe('iog', function () {

    describe('save', function () {
        it('should be ok with string message', async function () {
            let log = new Iog('a-context', {
                path: __dirname
            });
            log.write('my log');
        });
        it('should be ok with error', async function () {
            let log = new Iog('a-context', {
                path: __dirname
            });
            try {
                undefine.param = 'hello';
            } catch(e) {
                log.write(e);
            }

        });
        it('should be ok passing an object', async function () {
            let log = new Iog('a-context', {
                path: __dirname
            });
            try {
                undefine.param = 'hello';
            } catch(e) {
                log.write({
                    error: e.message,
                    other: {
                        meta: 'a meta'
                    }
                });
            }

        });
    });
});