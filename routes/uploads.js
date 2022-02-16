const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateImage, showImage } = require('../controllers/uploads.controller');
const { validateFields, validateFileUpload } = require('../middlewares');
const { allowedCollections } = require('../helpers')

const router = Router();

router.post( '/', validateFileUpload, uploadFiles );

router.put( '/:collection/:id', [
    validateFileUpload,
    check('id', 'Id needs to be mongo id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] )),
    validateFields
], updateImage );

router.get( '/:collection/:id', [
    check('id', 'Id needs to be mongo id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products'] )),
    validateFields
], showImage)

module.exports = router;