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
        // console.log(newUser)
        res.status(200).send(newUser)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body

        //check if user exists(and the hash)

        let foundUser = await db.get_user_by_username([username])
    
        let user = foundUser[0]
        // console.log(user)

        if (!user) {
            return res.status(401).send(`No account found with username: ${username}, please register before loggin in`)
        }

        let isUser = bcrypt.compareSync(password, user.password)
        // console.log(isUser)
        if (!isUser) {
            return res.status(401).send({ message: "incorrect password" })
        }
        req.session.user = user
        res.status(200).send({message: 'Logged in', user, loggedIn: true })
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send({message: 'Logged out', loggedIn: false})
    },
    getAllPosts: async (req, res) => {
        const { userPosts, id, search } = req.query;
        // console.log(userPosts, id, search)
        const db = req.app.get("db");
        let postsArr = [];
        if (userPosts === "true" && search) {
          postsArr = await db.get_all_posts({ search: `%${search}%`, id: "0" });
        }
        if (userPosts === "false" && !search) {
          postsArr = await db.get_all_posts({ search: "%%", id: { id } });
        }
        if (userPosts === "false" && search) {
          postsArr = await db.get_all_posts({ search: `%${search}%`, id: { id } });
        }
        if (userPosts === "true" && !search) {
          postsArr = await db.get_all_posts({ search: "%%", id: "0" });
        }
        res.status(200).send(postsArr);
      },
      getPost: async (req, res) => {
        const db = req.app.get('db')
        const post = await db.get_post({ id: req.params.id })
        res.status(200).send(post)
      },
      newPost: (req, res) => {
        const { id } = req.params
        const { title, imgURL, content } = req.body
        const db = req.app.get('db')
        db.new_post({ title, imgURL, content, id })
          .then(result => {
            res.status(200).send(result)
          }
          )
      }

}