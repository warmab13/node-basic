const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);


router.post('/gsignin',[
    check('id_token', 'Google id token is required').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;