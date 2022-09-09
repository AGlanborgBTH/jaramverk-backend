const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

module.exports = router;