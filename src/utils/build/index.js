exports.generateHash = generateHash;
exports.getActiveProfile = getActiveProfile;
exports.getBuildName = getBuildName;
exports.getUsername = getUsername;
exports.mergeJSON = mergeJSON;
exports.processPackageFile = processPackageFile;
exports.processPHPContent = processPHPContent;


const configs = require('../../configs.json');
const dateUtils = require('../date');
const hashing = require('hash-generator');
const minimist = require('minimist');
const username = require('username');
const deepmerge = require('deepmerge');

/**
 * @param {number=} hashLength
 * @returns {string} the hashed value
 */
function generateHash(hashLength) {
    const length = hashLength || configs.hashLength;
    return hashing(length);
}

/**
 * @returns {any} the 'env' command run argument
 */
function getActiveProfile() {
    try {
        const argv = minimist(process.argv.slice(2));
        if (!!argv.env) {
            return argv.env;
        }
    } catch (e) {
        throw new Error(e);
    }
    throw new Error('ERR: profile is missing');
}
