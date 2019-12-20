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
        it('should be ok with error 2', async function () {
            let log = new Iog('a-context', {
                path: __dirname
            });
            try {
                throw new Error('wow boom');
            } catch(e) {
                log.write(e);
            }

        });
        it('should be ok with error with onLog', function (done) {
            let log = new Iog('a-context', {
                path: __dirname,
                onLog(body, type) {
                    console.log('body:', body);
                    console.log('type:', type);
                    done();
                }
            });
            try {
                throw new Error('wow boom');
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
        it('should be ok passing an object, slim mode', async function () {
            let log = new Iog('a-context-slim', {
                path: __dirname,
                slim: true
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
        it('should be ok rotation', async function () {
            let log = new Iog('a-context', {
                path: __dirname,
                rotation: true
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