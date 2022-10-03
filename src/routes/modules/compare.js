const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const compare = {
    password: async (res, password, user) => {
        return bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/user/login",
                        title: "Error",
                        detail: "Could not decrypt password"
                    }
                })
            }

            if (result) {
                const payload = { email: user.email }
                const secret = process.env.JWT_SECRET
                const token = jwt.sign(payload, secret, { expiresIn: '1h' })

                return res.status(201).json({
                    data: {
                        _id: user["_id"],
                        email: user.email,
                        token: token
                    }
                })
            }

            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/user/login",
                    title: "Error",
                    detail: "Incorrect password"
                }
            })
        })
    }
}

module.exports = compare