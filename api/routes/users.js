const express = require('express')
const router = express.Router()
const user = require('../controllers/users')

<<<<<<< 2f1e3b84ca8f4566863f673f752017e0f58065b1
const {addUser, emailConfirmation, getAllUsers} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', emailConfirmation)
=======
const {addUser, tokenConfirmation, getAllUsers, login} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', tokenConfirmation)
router.post('/login', login)
>>>>>>> Add login route

module.exports = router