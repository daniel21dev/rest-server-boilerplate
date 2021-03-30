const { Router } = require('express');
const { check } = require('express-validator');
const { loginController } = require('../controllers/login');
const { validateFields } = require('../middlewares/validate-fields');
const router = Router();

router.post('/',[
    check('email','must be a valid email').isEmail(),
    check('password','must be an string').isString(),
    validateFields
], loginController);


module.exports = router;