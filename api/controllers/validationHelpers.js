const pool = require('../models/dbconnect')


const checkCondition = async(res, option, value)=>{
    try {
        const condition = `SELECT * FROM users WHERE ${option} = $1`
        const conditionValue = [value]
        const result = await pool.query(condition, conditionValue)
    return {
        data : result.rows
    }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
    
}


const addUser = async(res, username, name, email,password, age, gender, telephone, about_me, role)=>{
    try {
        const regex = /\S+@\S+\.\S/
        const isEmail = await checkCondition(res, 'email', email)
        const isUsername = await checkCondition(res, 'username', username)
        const addNewUser = `INSERT INTO users (username, name, email, password, age, gender, telephone,  about_me, role, created_on, last_login)
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`
        const addNewUserValues = [username, name, email, password, age, gender, telephone, about_me, role]
        
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
            await pool.query(addNewUser, addNewUserValues)
            return res.status(201).json({
                message: 'User created successfuly'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}


const validation = {checkCondition, addUser}
module.exports = validation