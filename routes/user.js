const { Router } = require('express');
const { check } = require('express-validator');
const { isValidRole, existsEmail, existUserById } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-fields');
const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete, 
        usersPatch } = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet);

//Validations for put
router.put('/:id', [
        check('id', 'This is not a valid id').isMongoId(),
        check('id').custom( existUserById ),
        check('role').custom( isValidRole ),
        validateFields
], usersPut);

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required and at least 6 characters').isLength({ min: 6 }),
        check('email').custom( existsEmail ),
        //check('role', 'Is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( isValidRole ),
        validateFields
], usersPost);

router.delete('/:id', [
        check('id', 'This is not a valid id').isMongoId(),
        check('id').custom( existUserById ),
        validateFields
], usersDelete);

router.patch('/', usersPatch);

module.exports = router;