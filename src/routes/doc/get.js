const express = require('express');
const router = express.Router();
const get = require('../../db/modules/doc/get');

router.get('/', async (req, res) => {
    try {
        let id = ""

        if (!req.headers["data-user-id"]) {
            throw "Action requires user to be logged in"
        } else {
            id = req.headers["data-user-id"]
        }

        const public = await get.multiple({ users: { $in: ["*"] } })
        const private = await get.multiple({ users: { $in: [id] } })

        const data = {
            data: [...public, ...private]
        };

        return res.json(data);
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/doc/",
                title: "Error",
                detail: e.message
            }
        });
    }
});

module.exports = router;