require('dotenv').config()
const express = require('express')
const session = require('express-session')
const ctrl = require('./controller')
const massive = require('massive')
const middleware = require('./middlewares')
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
// app.use(middleware.checkuser)
app.use(express.static(`${__dirname}/../build`))
//endpoints
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.delete('/auth/logout', ctrl.logout)

app.get('/api/posts', ctrl.getAllPosts)
app.get('/api/post/:id', ctrl.getPost)
app.post('/api/post/:id', ctrl.newPost)



//massive + app listening

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database is set')
    app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))
})
