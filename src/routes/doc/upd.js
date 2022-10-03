const express = require('express');
const router = express.Router();
const upd = require('../../db/modules/doc/upd')

router.put("/", (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty PUT request"
        }

        const id = req.body._id

        delete req.body._id

        upd.find(id, req.body)

        return res.status(200).json({
            data: {
                msg: "Got a PUT request, sending back 200: Doc updated"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/doc/put",
                title: "Error",
                detail: e.message || e
            }
        });
    }

});

module.exports = router;