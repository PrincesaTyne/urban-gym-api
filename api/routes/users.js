const express = require('express')
const router = express.Router()
const user = require('../controllers/users')

const {addUser, emailConfirmation, getAllUsers, login} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', emailConfirmation)
router.post('/login', login)


module.exports = router