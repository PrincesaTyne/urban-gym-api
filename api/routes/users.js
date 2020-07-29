const express = require('express')
const router = express.Router()
const user = require('../controllers/validationHelpers')

const {addUser, tokenConfirmation, getAllUsers, login} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', tokenConfirmation)
router.post('/login', login)

module.exports = router