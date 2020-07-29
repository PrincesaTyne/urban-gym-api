const express = require('express')
const router = express.Router()
const user = require('../controllers/validationHelpers')

const {addUser, tokenConfirmation, getAllUsers} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', tokenConfirmation)

module.exports = router