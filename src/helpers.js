const dateformat = require('dateformat');
const Helpers = {};

/**
 * Get locale date string
 * @param part {string} can be all, date, time
 * @returns {*}
 */
Helpers.getLocaleISODate = (part = 'all') => {
    const now = new Date();
    if(part === 'date')
        return dateformat(now, 'yyyy-mm-dd');
    else if(part === 'time')
        return dateformat(now, 'HH:MM:ss');
    else
        return dateformat(now, 'yyyy-mm-dd HH:MM:ss');
};

/**
 * Check if browser environment
 * @returns {boolean}
 */
Helpers.isBrowser = () => {
    return typeof window !== 'undefined';
};

module.exports = Helpers;