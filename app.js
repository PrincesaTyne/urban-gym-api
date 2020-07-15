const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const usersRoutes = require('./api/routes/users')
//const workoutsRoutes = require('./api/routes/workouts')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Acccess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

app.use('/users', usersRoutes)
//app.use('/workouts', workoutsRoutes)

app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status= 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})

app.listen(process.env.PORT || 3000, function(){console.log('Server Started on port 3000')})