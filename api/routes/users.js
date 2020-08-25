const express = require('express')
const router = express.Router()
const user = require('../controllers/users')

<<<<<<< HEAD
const {addUser, emailConfirmation, getAllUsers, login} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', emailConfirmation)
router.post('/login', login)

=======
const {addUser, tokenConfirmation, getAllUsers, login} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)
router.get('/confirmation/:token', tokenConfirmation)
router.post('/login', login)
>>>>>>> 82deb96331f0ab7fef0290d718ff23c4ccd604b9

module.exports = router