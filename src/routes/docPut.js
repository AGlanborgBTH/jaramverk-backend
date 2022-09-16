const express = require('express');
const router = express.Router();
const update = require('../db/action/update')

router.post("/", (req, res) => {
    try{
        const id = req.body._id
        delete req.body._id
        update.find(id, req.body)

        res.status(204).json({
            data: {
                msg: "Got a PUT request, sending back 204: Doc updated"
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