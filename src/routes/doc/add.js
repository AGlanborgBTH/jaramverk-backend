const express = require('express');
const router = express.Router();
const add = require('../../db/modules/doc/add')

router.post("/", (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty POST request"
        }

        delete req.body._id

        add.one(req.body)

        return res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201: Created doc"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/doc/post",
                title: "Error",
                detail: e.message || e
            }
        });
    }

});

module.exports = router;