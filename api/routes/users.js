const express = require('express')
const router = express.Router()
const user = require('../controllers/validationHelpers')
const checkLogin = require('../middleware/checkLogin')
const permissions = require('../middleware/permissions')

router.get('/', checkLogin, userRole('admin'), getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', tokenConfirmation)
router.post('/login', login)

module.exports = router