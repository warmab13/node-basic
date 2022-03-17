const { Router } = require('express');
const { check } = require('express-validator');
const { loginHotHorse, login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.post('/loginhh',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], loginHotHorse);


router.post('/gsignin',[
    check('id_token', 'Google id token is required').not().isEmpty(),
    validateFields
], googleSignIn);

router.get('/', [
    validateJWT
], renewToken)

module.exports = router;