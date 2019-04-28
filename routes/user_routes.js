const express = require('express')
const {check, body} =require('express-validator/check')
const router = express.Router()
const userController = require('../controller/user_controller')
const Auth = require('../util/middleware/middleware')


router.post('/signup',[check('email').isEmail()
.trim().withMessage('email is required').normalizeEmail(),
body('password', 'Password is require').isAlphanumeric().isLength({min: 7})],
 userController.signUp )
 
router.post('/signin', [check('username').trim()
.withMessage('username is required').isAlphanumeric(),
body('password', 'Password is require').isAlphanumeric().isLength({min: 6})]
,userController.signIn)
router.post('/editProfile/:userId',[check('email').isEmail()
.trim().withMessage('email is required').normalizeEmail(), 
body('username', 'username must be a string').isAlphanumeric().isLength({min: 5})], userController.editProfile)
router.post('/refreshToken', userController.refreshToken)
router.get('/getInfo/:userId', userController.getUser)
module.exports = router