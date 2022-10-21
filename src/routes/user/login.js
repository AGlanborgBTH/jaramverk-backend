const express = require('express');
const router = express.Router();
const login = require('../../db/modules/user/login')
const compare = require('./modules/compare')

router.post("/", async (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty POST request"
        }

        if (!req.body.email || !req.body.password) {
            throw "Missing email or password"
        }

        const user = await login.login(req.body)

        if (user) {
            return compare.password(res, req.body.password, user)
        }

        return res.status(401).json({
            errors: {
                status: 401,
                source: "/user/login",
                title: "User not found",
                detail: "User with provided email not found"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/user/login",
                title: "Error",
                detail: e.message || e
            }
        });
    }

});

module.exports = router;