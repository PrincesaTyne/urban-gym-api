const express = require('express')
const router = express.Router()
const user = require('../controllers/validationHelpers')
const checkAuthorization = require('../middleware/checkAuthorization')

const {addUser, tokenConfirmation, getAllUsers, login} = user

router.get('/', checkAuthorization, getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', tokenConfirmation)
router.post('/login', login)

module.exports = router