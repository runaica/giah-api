const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('예약 목록을 반환합니다.');
});

module.exports = router;
