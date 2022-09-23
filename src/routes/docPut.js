const express = require('express');
const router = express.Router();
const update = require('../db/action/update')

router.put("/", (req, res) => {
    try{
        if (Object.keys(req.body).length != 0) {
            const id = req.body._id
            delete req.body._id
            update.find(id, req.body)
        } else if (Object.keys(req.query).length != 0) {
            const id = req.query._id
            delete req.query._id
            update.find(id, req.query)
        } else {
            throw "Empty PUT request"
        }

        res.status(200).json({
            data: {
                msg: "Got a PUT request, sending back 200: Doc updated"
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