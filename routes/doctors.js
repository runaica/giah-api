const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET - 목록
router.get('/', (req, res) => {
  db.all('SELECT * FROM doctors', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'DB 조회 오류' });
    } else {
      res.json(rows);
    }
  });
});

// POST - 등록
router.post('/', (req, res) => {
  const { name, department, profileImage, description } = req.body;

  if (!name || !department) {
    return res.status(400).json({ error: 'name과 department는 필수입니다.' });
  }

  const sql = `
    INSERT INTO doctors (name, department, profileImage, description)
    VALUES (?, ?, ?, ?)
  `;
  const params = [name, department, profileImage || '', description || ''];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB 삽입 오류' });
    }
    // this.lastID → 방금 추가된 id
    res.status(201).json({ id: this.lastID, message: '등록 완료' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM doctors WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB 삭제 오류' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: '해당 ID의 의료진 없음' });
    }

    res.status(200).json({ message: '삭제 완료', deletedId: id });
  });
});

router.put('/:id', (req, res) => {
  const { name, department, profileImage, description } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE doctors 
    SET name = ?, department = ?, profileImage = ?, description = ?
    WHERE id = ?
  `;
  const params = [name, department, profileImage || '', description || '', id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB 업데이트 오류' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: '해당 ID의 의료진 없음' });
    }

    res.status(200).json({ message: '업데이트 완료', updatedId: id });
  });
});


module.exports = router;
