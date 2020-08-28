const express = require('express');
const teacherAuth = require('../middleware/teacher');
const studentAuth = require('../middleware/student');
const Subject = require('../models/subject');
const router = new express.Router();

router.post('/create', teacherAuth, async(req, res) => {

    const subject = new Subject({
        ...req.body,
        teacherId: req.teacher._id
    });
    try{
        await subject.save();
        const subjects = await Subject.find({teacherId: req.teacher._id});
        res.send(subjects);
    }catch (error) {
        res.status(500).send(error);
    }
});

router.post('/add/:subjectId', teacherAuth, async(req, res) => {

    try{
        const subject = await Subject.findOne({_id: req.params.subjectId, teacherId: req.teacher._id});
        if(!subject){
            throw 'Subject not present';
        }
        if(subject.students.includes(req.body.studentId)){
            throw 'Student Already added';
        }
        subject.students.push(req.body.studentId);
        await subject.save();
        await subject.populate('students');
        res.send({message: 'Student added in the subject', subject});
    } catch(error) {
        res.status(400).send(error);
    }
});

router.get('/teacher', teacherAuth, async(req, res) => {

    try {
        const subjects = await Subject.find({teacherId: req.teacher._id});
        for(const subject of subjects) {
            await subject.populate('students', '-tokens -password').execPopulate();
        }
        res.send(subjects);
    } catch (error){
        res.status(400).send(error);
    }
})

router.get('/student', studentAuth, async(req, res) => {

    try{
        const subjects = await Subject.find({students: req.student._id});
        if(!subjects) throw 'No Subjects Present';
        for(const subject of subjects){
            await subject.populate('teacherId', 'name').execPopulate();
        }
        res.send(subjects);
    }catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;