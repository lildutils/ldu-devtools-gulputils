const dateUtils = require('../dateUtils');
const hashing = require('hash-generator');
const minimist = require('minimist');
const username = require('username');
const deepmerge = require('deepmerge');

/**
 * It generates a unique hash string with given length
 * 
 * @param {number=} hashLength
 * @returns {string} the hashed value
 */
function generateHash(hashLength) {
    const length = hashLength || 8;
    return hashing(length);
}

exports.generateHash = generateHash;

/**
 * It returns the value from the --p={activeProfile} argument
 * 
 * @returns {any} the 'p' command run argument
 */
function getActiveProfile() {
    try {
        const argv = minimist(process.argv.slice(2));
        if (!!argv.p) {
            return argv.p;
        }
    } catch (e) {
        throw new Error(e);
    }
    throw new Error('ERR: "activeProfile" is missing');
}

exports.getActiveProfile = getActiveProfile;

/**
 * It returns a formatted .zip file name for builds by given project informations
 * 
 * @param {string} projectName
 * @param {string} projectVersion
 * @param {string=} opt_separator
 * @param {string=} opt_dateformat
 * @param {string=} opt_extension
 * @returns {string} the build package name
 */
function getBuildName(projectName, projectVersion, opt_separator, opt_dateformat, opt_extension) {
    if (!projectName) {
        throw new Error('ERR: "projectName" is missing');
    }
    if (!projectVersion) {
        throw new Error('ERR: "projectVersion" is missing');
    }
    const separator = opt_separator || '-';
    const fileDate = dateUtils.getNowFormatted(opt_dateformat || 'yyyymmddHHMMss');
    const fileExtension = opt_extension || '.zip';
    return projectName + separator + projectVersion + separator + fileDate + fileExtension;
}

exports.getBuildName = getBuildName;

/**
 * It returns the value of your username on your operating system
 * 
 * @returns {any} the system username 
 */
function getUsername() {
    try {
        return username.sync();
    } catch (e) {
        throw new Error(e);
    }
}

exports.getUsername = getUsername;

/**
 * It merges the given source JSON objects into one JSON object
 * 
 * @param {Object|Array<Object>} source
 * @returns {Object} the merged JSON objects
 */
function mergeJSON(source) {
    if (!source) {
        throw new Error('ERR: source is missing');
    }
    if (typeof source != 'Array') {
        source = [source];
    }
    return deepmerge.all(source);
}

exports.mergeJSON = mergeJSON;

/**
 * Copies the given properties from the given package.json file to a new processed object
 * 
 * @param {Object} packageJSON
 * @param {Array<any>?} opt_properties
 * @returns {Object} the processed packageJSON Object
 */
function processPackageFile(packageJSON, opt_properties) {
    if (!packageJSON) {
        throw new Error('ERR: packageJSON is missing');
    }
    if (!opt_properties) {
        return {
            name: packageJSON.name,
            version: packageJSON.version
        };
    }
    let processedPackageJSON = {};
    const l = arguments.length;
    for (let i = 1; i < l; i++) {
        const property = arguments[i];
        if (packageJSON.hasOwnProperty(property)) {
            processedPackageJSON[property] = packageJSON[property];
        }
    }
    return processedPackageJSON;
}

exports.processPackageFile = processPackageFile;

/**
 * Concatenate the given content from .php files into one processed string value
 * 
 * @param {string} content
 * @return {string} the processed string content
 */
function processPHPContent(content) {
    if (!content) {
        throw new Error('ERR: content is missing');
    }
    content = content.replace(/\<\?php/g, '');
    content = content.replace(/\?\>/g, '');
    return '<?php' + content + '?>';
}

exports.processPHPContent = processPHPContent;

/**
 * Processing the arguments, and giving back they in a JSON object
 * 
 * @return {Object} the processed arguments
 */
function processArgs() {
    return process.argv
        .slice(2)
        .map(p => p.indexOf("=") > -1
            ? {
                key: p.split("=")[0].replace("--", ""),
                value: p.split("=")[1]
            }
            : {
                key: p.replace("--", ""),
                value: null
            })
        .reduce((obj, cur, i) => {
            obj[cur.key] = cur.value;
            return obj;
        }, {});
}

exports.processArgs = processArgs;
