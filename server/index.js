require('dotenv').config()
const express = require('express')
const app = express()
const ctrl = require('./controller')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const massive = require('massive')
const session = require('express-session')

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.post('/auth/logout', ctrl.logout)

// app.get('/api/posts/:userid', ctrl.getPosts)
app.get('/api/posts/', ctrl.getPosts)
app.get('/api/post/:postid', ctrl.getOnePost)
// app.post('/api/post/new/:userid', ctrl.addPost)
app.post('/api/post/new/', ctrl.addPost)

app.get('/api/auth/me', ctrl.findUser)


//massive + app listening

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('Database is set')
    app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))
})
