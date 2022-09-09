const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    });
});

module.exports = router;