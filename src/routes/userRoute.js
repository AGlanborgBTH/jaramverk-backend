const express = require('express');
const router = express.Router();
const reg = require('./user/reg')
const login = require('./user/login')

router.use("/register", reg);
router.use("/login", login);

module.exports = router;