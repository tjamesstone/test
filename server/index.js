require('dotenv').config()
const express = require('express')
const session = require('express-session')
const ctrl = require('./controller')
const massive = require('massive')
let{SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()

//Middleware
app.use(express.json())
app.use(
    session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
//endpoints
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.delete('/auth/logout', ctrl.logout)

//massive + app listening

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database is set')
    app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))
})
