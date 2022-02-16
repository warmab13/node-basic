const dbValidators = require('./db-validators');
const categoryValidators = require('./category-validators');
const generateJWT = require('./generate-jwt');
const gVerify = require('./google-verify');
const uploadFiles = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...categoryValidators,
    ...generateJWT,
    ...gVerify,
    ...uploadFiles,
}