const express = require('express');
const cors = require('cors'); // 추가

const app = express();
const port = 3000;

// CORS 허용
app.use(cors());
app.use(express.json());

const homeRouter = require('./routes/home');
const doctorRouter = require('./routes/doctors');
const noticeRouter = require('./routes/notices');
const reservationRouter = require('./routes/reservations');
const consultationRouter = require('./routes/consultations'); 
app.use('/', homeRouter);
app.use('/doctors', doctorRouter);
app.use('/notices', noticeRouter);
app.use('/reservations', reservationRouter);
app.use('/consultations', consultationRouter); // 추가



app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});





