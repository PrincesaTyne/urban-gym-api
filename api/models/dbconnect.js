require('dotenv').config()
const {Pool} = require('pg')
const pool =  new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

const createTables = async() =>{
<<<<<<< 70e0c28ad5659d80b5e618d6e6dbed847654fe0a
=======
    const usersTable = `CREATE TABLE IF NOT EXISTS users (
        user_id serial PRIMARY KEY,
        username VARCHAR (50) UNIQUE,
        name VARCHAR (50),
        password VARCHAR (250) NOT NULL,
        email VARCHAR (50) UNIQUE NOT NULL,
        age INT,
        gender VARCHAR(250),
        telephone VARCHAR(20),
        about_me VARCHAR(300),
        role VARCHAR(20) NOT NULL,
        confirmed BOOL NOT NULL DEFAULT FALSE,
        created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP NOT NULL
    )`
    
    const workoutsTable = `CREATE TABLE IF NOT EXISTS workouts (
        workout_id serial PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        category VARCHAR(50),
        author_id serial REFERENCES users(user_id) ON DELETE CASCADE
    )`
>>>>>>> Change confirmed column from VARCHAR to BOOL datatype
    try{
        const usersTable = `CREATE TABLE IF NOT EXISTS users (
            user_id serial PRIMARY KEY,
            username VARCHAR (50) UNIQUE,
            name VARCHAR (50),
            password VARCHAR (250) NOT NULL,
            email VARCHAR (50) UNIQUE NOT NULL,
            age INT,
            gender VARCHAR(250),
            telephone VARCHAR(20),
            about_me VARCHAR(355),
            role VARCHAR(20) NOT NULL,
            is_confirmed BOOLEAN DEFAULT 'FALSE',
            created_on TIMESTAMP NOT NULL,
            last_login TIMESTAMP NOT NULL
        )`
        
        const workoutsTable = `CREATE TABLE IF NOT EXISTS workouts (
            workout_id serial PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            category VARCHAR(50),
            author_id serial REFERENCES users(user_id) ON DELETE CASCADE
        )`

        await pool.query(usersTable)
        await pool.query(workoutsTable)
    } catch(err){
        console.error(err)
    }
}
createTables()

module.exports = pool