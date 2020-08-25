const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('./src/db/mongoose');

const studentRouter = require('./src/routes/student');
const teacherRouter = require('./src/routes/teacher');
const subjectRouter = require('./src/routes/subject');
const lectureRouter = require('./src/routes/lecture');

const app = express();
const port = process.env.PORT || 5000 ;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny'));

app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/subject', subjectRouter);
app.use('/lecture', lectureRouter);

app.listen(port, () => {
    console.log(`Express server started at port: ${port}.` );
});