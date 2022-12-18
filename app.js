const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const mongoose = require('mongoose')

app.use( cors() )
app.use( cookieParser() )

app.use( session( {
    resave: true,
    saveUninitialized: true,
    secret: ['values', 'for', 'security', 'secret'],
    secret: 'secret',
} ) )

app.use( bodyParser.urlencoded( {extended: true} ) )
app.use( bodyParser.json() )

app.use( morgan('dev') )

mongoose.connect('mongodb+srv://Sarthak1202:sarthak1395mongodb@cluster0.omuy5ko.mongodb.net/SignUp_Login_Backend_01?retryWrites=true&w=majority')
    .then(console.log('Connection Successful!'))
    .catch(err => console.log(err))


const homeRoute = require('./api/routes/home')
const loginHandler = require('./api/routes/login')
const signupHandler = require('./api/routes/signup')
const logoutHandler = require('./api/routes/logout')

app.use('/', homeRoute)
app.use('/users/login', loginHandler)
app.use('/users/signup', signupHandler)
app.use('/users/logout', logoutHandler)

app.use((request, response) => {
    response.status(404).json( {msg: 'Resource Not Found!'} )
} )

module.exports = app;