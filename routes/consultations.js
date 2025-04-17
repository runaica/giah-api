const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - 전체 상담 목록 조회
router.get('/', (req, res) => {
  const sql = 'SELECT id, subject, ownerName, status, insertDate FROM consultation ORDER BY insertDate DESC';
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
  const sql = 'SELECT * FROM consultation WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DB 조회 오류');
    }
    if (!row) {
      return res.status(404).send('Consultation not found');
    }
    res.json(row);
  });
});

// POST - 상담 등록
router.post('/', (req, res) => {
  const { status, subject, content, ownerName, password, email, agreeEmail, phoneNumber, agreeSms, agreePrivacy } = req.body;

  const sql = `
    INSERT INTO consultation (status, subject, content, ownerName, password, email, agreeEmail, phoneNumber, agreeSms, agreePrivacy, insertDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `;
  const params = [status, subject, content, ownerName, password, email, agreeEmail, phoneNumber, agreeSms, agreePrivacy];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('DB 삽입 오류');
    }
    res.status(201).json({ id: this.lastID, message: 'Consultation created successfully' });
  });
});

// DELETE - 상담 삭제
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM consultation WHERE id = ?';
  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('DB 삭제 오류');
    }
    if (this.changes === 0) {
      return res.status(404).send('Consultation not found');
    }
    res.json({ message: 'Consultation deleted successfully' });
  });
});

// PUT - 상담 수정
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status, subject, content, ownerName, password, email, agreeEmail, phoneNumber, agreeSms, agreePrivacy } = req.body;

  const sql = `
    UPDATE consultation
    SET status = ?, subject = ?, content = ?, ownerName = ?, password = ?, 
        email = ?, agreeEmail = ?, phoneNumber = ?, agreeSms = ?, agreePrivacy = ?
    WHERE id = ?
  `;
  const params = [status, subject, content, ownerName, password, email, agreeEmail, phoneNumber, agreeSms, agreePrivacy, id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send('DB 업데이트 오류');
    }
    if (this.changes === 0) {
      return res.status(404).send('Consultation not found');
    }
    res.json({ message: 'Consultation updated successfully' });
  });
});

module.exports = router;
