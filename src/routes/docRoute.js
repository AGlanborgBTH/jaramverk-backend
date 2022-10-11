const express = require('express');
const router = express.Router();
const get = require('./doc/get')
const put = require('./doc/upd')
const post = require('./doc/add')
const { checkToken } = require("../middleware/checkToken")

router.use(checkToken)

router.use("/", get);
router.use("/put", put);
router.use("/post", post);

module.exports = router;