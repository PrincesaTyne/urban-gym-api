const pool = require('../models/dbconnect')
const bcrypt = require('bcrypt')



const getUser = async(res, option, value)=>{
    try {
        const user = `SELECT * FROM users WHERE ${option} = $1`
        const userValue = [value]
        const result = await pool.query(user, userValue)
    return {
        data : result.rows
    }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
    
}


const addUser = async(req, res)=>{
    try {
        const {username, name, email, password, password2, age, gender, telephone, about_me, role} = req.body
        const hashedPassword = await bcrypt.hash(password, 8)
        const regex = /\S+@\S+\.\S/
        const isEmail = await getUser(res, 'email', email)
        const isUsername = await getUser(res, 'username', username)
        const addNewUser = `INSERT INTO users (username, name, email, password, age, gender, telephone,  about_me, role, created_on, last_login)
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`
        const addNewUserValues = [username, name, email, hashedPassword, age, gender, telephone, about_me, role]
        
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
        }else if(username && (username.indexOf(' ') >= 0)){
            return res.status(400).json({
                message: 'Username should not contain spaces'
            })
        }else if(username && isUsername.data.length){
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
        }else if (password !== password2){
            return res.status(400).json({
                message: 'Passwords do not match'
            })
        }else {
            const results = await pool.query(addNewUser, addNewUserValues)
            return res.status(201).json({
                message: 'User created successfuly',
                data: results.rows[0]
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}

const getAllUsers = async(req, res)=>{
    try {
        const allUsers = `SELECT * FROM users`

        pool.query(allUsers, (err, results)=>{
            if(err){
                return res.status(400).json({
                    message: err.message
                })
            }

            return res.status(200).json({
                message:  `We have ${results.rows.length} users.`,
                data : results.rows
            })
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


const user = {addUser, getAllUsers}
module.exports = user