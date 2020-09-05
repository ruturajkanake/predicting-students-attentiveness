const express = require('express');
const Record = require('../models/student-record');
const studentAuth = require('../middleware/student');
const teacherAuth = require('../middleware/teacher');
const router = new express.Router();

router.post('/create/:lectureId/:subjectId', studentAuth, async(req, res) => {
    try{
        const isPresent = await Record.findOne({lectureId: req.params.lectureId, studentId: req.student._id});
        if(isPresent) throw 'Already Present';
        const record = new Record({
            lectureId: req.params.lectureId, 
            studentId: req.student._id,
            subjectId: req.params.subjectId,
            recordX: req.body.xData,
            recordY: req.body.yData
        });
        await record.save();
        res.send(record);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/student/:id', studentAuth, async(req, res) => {
    try{
        const record = await Record.findOne({lectureId: req.params.id, studentId: req.student._id});
        if(!record) throw 'Record not present';
        res.send(record);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get('/list/students/:id', teacherAuth, async(req, res) => {
    try {
        const records = await Record.find({lectureId: req.params.id}, '-recordX -recordY');
        if(!records) throw 'No Student Records Present';
        for(const record of records){
            await record.populate('studentId', 'name').execPopulate();
        }
        res.send(records);
    } catch(error){
        res.status(400).send(error);
    }
});

router.get('/teacher/:lectureId/:studentId', teacherAuth, async(req, res) => {
    try {
        const record = await Record.findOne({...req.params});
        if(!record) throw 'Record not present';
        await record.populate('studentId', 'name').execPopulate();
        res.send(record);
    } catch (error){
        res.status(400).send(error)
    }
})

module.exports = router;