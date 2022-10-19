const express = require('express');
const router = express.Router();
const post = require('./email/send')
const { checkToken } = require("../middleware/checkToken")

router.use(checkToken)

router.use("/", post);

module.exports = router;