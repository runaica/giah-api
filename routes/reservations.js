const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - 전체 상담 목록 조회
router.get('/', (req, res) => {
  const sql = 'SELECT *  FROM reservation ORDER BY insertDate DESC';
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB 조회 오류');
    }
    res.json(rows);
  });
});

// GET - 단일 상담 조회
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM reservation WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB 조회 오류');
    }
    if (!row) {
      return res.status(404).send('reservation not found');
    }
    res.json(row);
  });
});


// POST - 예약 등록
router.post('/', (req, res) => {
  const { ownerName, petName, reservationDate, reservationTime, phoneNumber, attendingVet, visitPurpose } = req.body;

  // 필수 항목 체크
  if (!ownerName || !petName || !reservationDate || !reservationTime) {
    return res.status(400).send('필수 입력값 누락');
  }

  // 현재 시간 기준 insertDate 생성
  const insertDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // YYYY-MM-DD HH:MM:SS

  const sql = `
    INSERT INTO reservation 
      (ownerName, petName, reservationDate, reservationTime, phoneNumber, attendingVet, visitPurpose, insertDate)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [ownerName, petName, reservationDate, reservationTime, phoneNumber, attendingVet, visitPurpose, insertDate];

  db.run(sql, params, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send('예약 등록 실패');
    }
    // 성공 시 생성된 ID 반환
    res.json({ id: this.lastID });
  });
});



module.exports = router;
