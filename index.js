const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const homeRouter = require('./routes/home');
const doctorRouter = require('./routes/doctors');
const noticeRouter = require('./routes/notices');
const reservationRouter = require('./routes/reservations');

app.use('/', homeRouter);
app.use('/doctors', doctorRouter);
app.use('/notices', noticeRouter);
app.use('/reservations', reservationRouter);


app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});


