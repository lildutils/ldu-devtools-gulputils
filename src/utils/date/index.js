exports.getNow = getNow;
exports.getNowFormatted = getNowFormatted;


const dateformat = require('dateformat');

/**
 * Gets the now as Date
 * 
 * @returns {Date} the now
 */
function getNow() {
    return new Date();
}

/**
 * Gets the formatted now as string
 * 
 * @param {string=} opt_dateFormat 
 * @returns {string} the formatted now
 */
function getNowFormatted(opt_dateFormat) {
    return dateformat(new Date(), opt_dateFormat || 'yyyymmddHHMMss');
}
