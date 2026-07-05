const express = require('express');
const router = express.Router();

router.use('/v1/api/todos', require('./todo'));

module.exports = router;