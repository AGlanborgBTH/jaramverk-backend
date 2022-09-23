const express = require('express');
const router = express.Router();
const update = require('../db/action/update')

router.put("/", (req, res) => {
    try{
        const id = req.query._id
        delete req.query._id
        update.find(id, req.query)

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
                detail: e.message
            }
        });
    }

});

module.exports = router;