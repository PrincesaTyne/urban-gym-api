const {Pool} = require('pg')
const pool =  new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345',
    port: 5432
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
        created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP NOT NULL
    )`
    
    const workoutsTable = `CREATE TABLE IF NOT EXISTS workouts (
        workout_id serial PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        category VARCHAR(50),
        author_id serial REFERENCES users(user_id)
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