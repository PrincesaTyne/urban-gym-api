const express = require('express')
const router = express.Router()
const user = require('../controllers/users')

const {addUser, emailConfirmation, getAllUsers} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', emailConfirmation)

module.exports = router