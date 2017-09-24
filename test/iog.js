const Iog = require('../src/iog');
const be = require('bejs');

describe('logger', function () {
    this.timeout(5000);

    it('error', function () {
        const logger = Iog();
        console.log(logger);
        logger.error(new Error('aaaaaa'));

    })
});