const express = require('express');
const router = express.Router();
const find = require('../db/action/find');

router.get('/', async (req, res) => {
    try {
        const data = {
            data: await find.all()
        };

        res.json(data);
    } catch (e) {
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