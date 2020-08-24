const express = require('express');
const bodyParser = require('body-parser');

require('./src/db/mongoose');

const studentRouter = require('./src/routes/student');
const teacherRouter = require('./src/routes/teacher');

const app = express();
const port = process.env.PORT || 5000 ;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);

app.listen(port, () => {
    console.log(`Express server started at port: ${port}.` );
});