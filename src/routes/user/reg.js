const express = require('express');
const router = express.Router();
const reg = require('../../db/modules/user/reg')

router.post("/", (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty POST request"
        }

        reg.reg(req.body)

        return res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201: Created user"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/user/register",
                title: "Error",
                detail: e.message || e
            }
        });
    }

});

module.exports = router;