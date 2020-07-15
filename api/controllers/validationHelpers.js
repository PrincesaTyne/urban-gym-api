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
        const addNewUser = `INSERT INTO users (username, name, email, password, age, gender, telephone,  about_me, role, created_on, last_login)
                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`
        const addNewUserValues = [username, name, email, password, age, gender, telephone, about_me, role]

        result = await pool.query(addNewUser, addNewUserValues)

        return {
            result: result.rows
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}


const validation = {checkCondition, addUser}
module.exports = validation