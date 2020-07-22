const express = require('express')
const router = express.Router()
const user = require('../controllers/validationHelpers')

const {addUser, getAllUsers} = user

router.get('/', getAllUsers)
router.post('/signup', addUser)

module.exports = router