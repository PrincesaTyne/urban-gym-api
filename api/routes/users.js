const express = require('express')
const router = express.Router()
const user = require('../controllers/validationHelpers')
const checkAuthorization = require('../middleware/checkAuthorization')
const permissions = require('../middleware/permissions')

const {addUser, tokenConfirmation, getAllUsers, login} = user

router.get('/', checkAuthorization, permissions('member'), getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', tokenConfirmation)
router.post('/login', login)

module.exports = router