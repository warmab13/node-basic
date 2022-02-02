const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, isAdminRole, hasRole } = require('../middlewares');
const { getCategories,
        getCategory,
        createCategory,
        updateCategory,
        categoryDelete } = require('../controllers/categories.controller')
//const { existCategoryByName } = require('../helpers/category-validators');
const { existCategoryById } =  require('../helpers/db-validators')

const router = Router();
//Crear una validacion personalizada para validar el id 
/**
 * {{url}}/api/categories**/

 //Get all the categories - public
router.get('/', getCategories)

//Get one category by ID - public
router.get('/:id',[
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom( existCategoryById ),
    validateFields,
], getCategory)

//Create category, privado, everyone with any role
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
], createCategory)

//Update - private - anyone with a valid token
router.put('/:id',[
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom( existCategoryById ),
    validateFields
], updateCategory)


//Delete category - only Admin - only change status
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom( existCategoryById ),
    validateFields
], categoryDelete)

module.exports = router;