const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        let users = await db.get_user_by_username([username])
        let user = users[0]
        if(user) {
            return res.status(409).send(`Account already exists`)
          }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let register = await db.register_user([username, hash, `http://robohash.org/${username}`])
        let newUser = register[0]
        delete newUser.password
        req.session.user = newUser

        res.status(200).send(req.session.user)
    }
}