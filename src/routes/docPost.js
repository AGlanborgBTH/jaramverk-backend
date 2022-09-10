const express = require('express');
const router = express.Router();
const handleDocPost = require('../db/sort/handleDocPost')

router.post("/", (req, res) => {
    try{
        handleDocPost(req.query)

        res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201 Created"
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