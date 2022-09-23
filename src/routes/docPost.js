const express = require('express');
const router = express.Router();
const add = require('../db/action/add')

router.post("/", (req, res) => {
    try{
        delete req.query._id
        add.one(req.query)

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
                detail: e.message
            }
        });
    }

});

module.exports = router;