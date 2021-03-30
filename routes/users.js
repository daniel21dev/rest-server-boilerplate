const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, saveUsers, updateUsers, deleteUsers } = require('../controllers/users');
const { emailExists, userNameExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', getUsers);

router.post('/',[
    check('name','the name is required').not().isEmpty(),
    check('userName','the userName is required').not().isEmpty(),
    check('password','the password is required').not().isEmpty(),
    check('password','the password must be a string').isString(),
    check('email','the email is required').isEmail(),
    check('email').custom( emailExists ),
    check('userName').custom( userNameExists ),
    validateFields
], saveUsers);

router.put('/:id',[
    validateJWT,
    check('id','must be a mngoID').isMongoId(),
    validateFields
] ,updateUsers);

router.delete('/:id',[
    validateJWT
], deleteUsers);

module.exports = router;
