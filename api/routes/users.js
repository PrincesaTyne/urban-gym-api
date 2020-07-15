const express = require('express')
const router = express.Router()
const pool = require('../models/dbconnect')
const validation = require('../controllers/validationHelpers')
const bcrypt = require('bcrypt')


router.get('/', (req, res, next)=>{
    const allUsers = `SELECT * FROM users`

    pool.query(allUsers, (err, results)=>{
        if(err){
            return res.status(400).json({
                message: err.message
            })
        }

        return res.status(200).json({
            message:  `We have ${results.rows.length} users.`,
            users: results.rows
        })
    })
})

router.post('/signup', async (req, res, next)=>{
    try{
        const regex = /\S+@\S+\.\S/
        const {username, name, email, password, age, gender, telephone, about_me, role} = req.body
        const isEmail = await validation.checkCondition(res, 'email', email)
        const isUsername = await validation.checkCondition(res, 'username', username)
        const hashedPassword = await bcrypt.hash(password, 8)
            
        if (!email || !password){
            return res.status(400).json({
                message: 'Email and Password is required'
            })
        }else if (age &&  typeof age !==  'number'){
            return res.status(400).json({
                message: 'Age should be a number'
            })
        }else  if (email && isEmail.data.length){
            return res.status(400).json({
                message: 'Email already exists'
            })
        } else if(username && isUsername.data.length){
            return res.status(400).json({
                message: 'Username already exists'
            })
        }else if (regex.test(email) === false){
            return res.status(400).json({
                message: 'Please enter a valid email'
            })
        }else if (password.length < 6){
            return res.status(400).json({
                message: 'Password should contain 6 or more characaters'
            })
        }else {
            validation.addUser(res, username, name, email, hashedPassword, age, gender, telephone, about_me, role)
            return res.status(201).json({
                    message: 'User created successfuly'
                })
        }
    } catch(err){
        return res.status(400).json({
            message: err.message
        })
    }
})


router.get('/:userId', (req, res, next)=>{
    const userId = req.params.userId
    const user = `SELECT * FROM users WHERE user_id = $1`
    const userValue = [userId]

    pool.query(user, userValue, (err, results)=>{
        if(err){
            return res.status(400).json({
                message: err.message
            })
        }else if(results.rows.length > 0){
            return res.status(200).json({
                message:  `Information about user with id ${userId}.`,
                users: results.rows
            })
        }else {
            return res.status(400).json({
                message:  `User with id ${userId} does not exist.`
            })
        }    
    })
})



router.put('/:userId', (req, res, next)=>{
    res.status(200).json({
        message: 'updatedr'
    })
})


router.delete('/:userId', (req, res, next)=>{
    const userId = req.params.userId
    const deleteUser = `DELETE FROM users WHERE user_id = $1`
    const deleteUserValue = [userId]

    pool.query(deleteUser, deleteUserValue, (err, results)=>{
        if(err){
            return res.status(400).json({
                message: err.message
            })
        }else if(results.rows.length > 0){
            return res.status(200).json({
                message:  `User deleted successfully.`
            })
        }else {
            return res.status(400).json({
                message:  `User with id ${userId} does not exist.`
            })
        }
    })
})


module.exports = router