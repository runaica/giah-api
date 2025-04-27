const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'hospital.db'));

// 테이블 생성
db.serialize(() => {
  // 의료진 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      profileImage TEXT,
      description TEXT
    )
  `);

  // 공지사항 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      createdAt TEXT NOT NULL
    )
  `);
  //상담테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS consultation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      insertDate TEXT NOT NULL,              -- 등록시간
      status TEXT NOT NULL,              -- 등록상태(답변여부 등등)
      subject TEXT NOT NULL,              -- 상담 제목
      content TEXT NOT NULL,               -- 상담 내용
      ownerName TEXT NOT NULL,             -- 보호자 이름
      password TEXT NOT NULL,              -- 상담 비밀번호
      email TEXT,                          -- 이메일 (선택)
      agreeEmail TEXT,                     -- 이메일 수신 동의 (Y/N)
      phoneNumber TEXT,                    -- 연락처 (선택)
      agreeSms TEXT,                       -- 문자 수신 동의 (Y/N)
      agreePrivacy TEXT NOT NULL,          -- 개인정보 취급방침 동의 (Y/N)
      createdAt TEXT DEFAULT (datetime('now', 'localtime')) -- 작성 시각
    )
  `);
   // 예약 테이블 DROP
   db.run(`DROP TABLE IF EXISTS reservation`);

  //예약테이블블
  db.run(`
    CREATE TABLE IF NOT EXISTS reservation (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ownerName TEXT NOT NULL,         -- 보호자 이름
      insertDate TEXT NOT NULL,              -- 등록시간
      petName TEXT NOT NULL,           -- 반려동물 이름
      reservationDate TEXT NOT NULL,   -- 예약 날짜 (예: 2025-04-18)
      reservationTime TEXT NOT NULL,   -- 예약 시간 (예: 14:30)
      phoneNumber TEXT,                -- 연락처
      attendingVet TEXT,               -- 담당 수의사
      visitPurpose TEXT                -- 방문 목적
    )
  `);
  
});

module.exports = db;
