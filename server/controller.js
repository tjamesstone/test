const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        let foundUser = await db.get_user_by_username([username])
        let user = foundUser[0]
        if(user) {
            return res.status(409).send(`Username: ${username} is already taken`)
          }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let registeredUser = await db.register_user([username, hash, `http://robohash.org/${username}`])
        let newUser = registeredUser[0]
        delete newUser.password
        req.session.user = newUser

        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
    const db = req.app.get('db')
    const {username, password} = req.body

    let foundUser = await db.get_user_by_username([username])
        let user = foundUser[0]
    if(!user) {
        return res.status(401).send(`No account found with username: ${username}, please register before loggin in`)
    }

    let isUser = bcrypt.compareSync(password, user.password)
    if(!isUser) {
        return res.status(401).send(`Username or password incorrect`)
    }
    delete user.password
    req.session.user = user
    res.status(200).send(user)
    }
}