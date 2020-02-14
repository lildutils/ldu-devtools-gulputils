exports.getNow = getNow;
exports.getNowFormatted = getNowFormatted;


const configs = require('../../configs.json');
const dateformat = require('dateformat');

/**
 * @returns {Date} the now
 */
function getNow() {
    return new Date();
}

/**
 * @param {string=} dateFormat 
 * @returns {string} the formatted now
 */
function getNowFormatted(dateFormat) {
    return dateformat(new Date(), dateFormat || configs.dateFormat);
}
