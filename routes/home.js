// routes/home.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('홈페이지입니다 (home.js에서 옴)');
});

module.exports = router;
