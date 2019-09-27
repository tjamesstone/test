const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body

        const foundUser = await db.get_user_by_username([username])
        // console.log(foundUser)
        let user = foundUser[0]
        if (user) {
            return res.status(409).send(`Username: ${username} is already taken`)
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const profilePic = `http://robohash.org/${username}?set=set5`
        let register =  await db.register_user([username, hash, profilePic])
            .catch(err => {res.status(200).send({message: err.message}) })
        const newUser = register[0]
        // console.log(newUser)
        req.session.user = newUser

        res.status(200).send(newUser)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body

        let foundUser = await db.get_user_by_username([username])
        let user = foundUser[0]
        if (!user) {
            return res.status(401).send(`No account found with username: ${username}, please register before loggin in`)
        }

        let isUser = bcrypt.compareSync(password, user.password)
        if (!isUser) {
            return res.status(401).send(`Username or password incorrect`)
        }
        req.session.user = user
        res.status(200).send({message: 'Logged in', user: req.session.user, loggedIn: true })
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({message: 'Logged out', loggedIn: false})
    }
}