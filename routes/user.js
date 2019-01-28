'use strict';
const router = require('express-promise-router')();
const UserController = require('../controllers/user');
const { validateBody, validateParam, schemas } = require('../helpers/validator');
const passport = require('passport');
const passportConfig = require('../lib/passport');
const authenticate = (strategy) => passport.authenticate(`${strategy}`, { session: false });

router.route('/signin')
    .post(validateBody(schemas.authSchema), authenticate('local'), UserController.signIn);

router.route('/signup')
    .post(validateBody(schemas.userSchema), UserController.signUp);

router.route('/secret')
    .post(authenticate('jwt'), UserController.secret);

module.exports = router;