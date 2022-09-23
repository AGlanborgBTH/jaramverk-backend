const express = require('express');
const router = express.Router();
const add = require('../db/action/add')

router.post("/", (req, res) => {
    try{
        if (Object.keys(req.body).length != 0) {
            delete req.body._id
            add.one(req.body)
        } else if (Object.keys(req.query).length != 0) {
            delete req.query._id
            add.one(req.query)
        } else {
            throw "Empty POST request"
        }

        res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201: Created doc"
            }
        });}
    catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/",
                title: "Database error",
                detail: e.message || e
            }
        });
    }

});

module.exports = router;