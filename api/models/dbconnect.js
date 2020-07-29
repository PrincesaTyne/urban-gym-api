require('dotenv').config()
const {Pool} = require('pg')
const pool =  new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

/*
const isProduction = process.env.NODE_ENV === "production"
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:process.env.DB_PORT/${process.env.DB_DATABASE}`

const pool =  new Pool({
    connectionString: isProduction ? process.env.DATABA_URL : connectionString
})
*/

/*
pool.once('open', (err, client)=> {
    console.log('Connected to database')
})
*/

const createTables = async() =>{
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
        confirmed VARCHAR(20) DEFAULT FALSE,
        created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP NOT NULL
    )`
    
    const workoutsTable = `CREATE TABLE IF NOT EXISTS workouts (
        workout_id serial PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        category VARCHAR(50),
        author_id serial REFERENCES users(user_id) ON DELETE CASCADE
    )`
    try{
        users =  await pool.query(usersTable)
        workouts = await pool.query(workoutsTable)
    } catch(err){
        console.error(err)
    }
}
createTables()

module.exports = pool