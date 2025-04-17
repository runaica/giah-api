const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const offset = (page - 1) * size;

  const sql = `
  SELECT * FROM notices
  ORDER BY createdAt DESC
  LIMIT ? OFFSET ?
`;

  db.all(sql, [size, offset], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB 조회 오류' });
    }

    res.json({
      page,
      size,
      data: rows
    });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM notices WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'DB 조회 오류' });
    } else if (!row) {
      res.status(404).json({ error: '해당 공지가 없습니다.' });
    } else {
      res.json(row);
    }
  });
});

// POST - 등록
router.post('/', (req, res) => {
  const { title, content, createdAt } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'title과 content는 필수입니다.' });
  }
notices
  const sql = `
    INSERT INTO notices (title, content, createdAt)
    VALUES (?, ?, ?)
  `;
  const params = [title, content, createdAt];

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

  const sql = `DELETE FROM notices WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB 삭제 오류' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: '해당 ID의 공지사항항 없음' });
    }

    res.status(200).json({ message: '삭제 완료', deletedId: id });
  });
});

router.put('/:id', (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const createdAt = new Date().toISOString(); // 서버에서 생성

  const sql = `
    UPDATE notices 
    SET title = ?, content = ?, createdAt = ?
    WHERE id = ?
  `;
  const params = [title, content, createdAt , id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'DB 업데이트 오류' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: '해당 ID 공지사항 없음' });
    }

    res.status(200).json({ message: '업데이트 완료', updatedId: id });
  });
});


module.exports = router;
