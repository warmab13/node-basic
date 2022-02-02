const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, isAdminRole, hasRole } = require('../middlewares');
const { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    productDelete 
} = require('../controllers/products.controller')
//const { existCategoryByName } = require('../helpers/category-validators');
const { existCategoryById, existProductById } =  require('../helpers/db-validators')

const router = Router();
//Crear una validacion personalizada para validar el id 
/**
 * {{url}}/api/products**/

 //Get all the products - public
router.get('/', getProducts)

//Get one products by ID - public
router.get('/:id',[
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom( existProductById ),
    validateFields,
], getProduct)

//Create products, privado, everyone with any role
router.post('/', [
    validateJWT,
    check('name', 'Product name is required').not().isEmpty(),
    check('category', 'Is not a valid id for category').isMongoId(),
    check('category').custom( existCategoryById ),
    validateFields
], createProduct)

//Update - private - anyone with a valid token
router.put('/:id',[
    validateJWT,
    check('category', 'Is not a valid id for category').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
], updateProduct)


//Delete category - only Admin - only change status
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid id for category').isMongoId(),
    check('id').custom( existProductById ),
    validateFields
], productDelete)

module.exports = router;