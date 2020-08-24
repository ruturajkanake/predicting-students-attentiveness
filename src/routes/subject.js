const express = require('express');
const auth = require('../middleware/teacher');
const Subject = require('../models/subject');
const router = new express.Router();

router.post('/create', auth, async(req, res) => {
    const subject = new Subject({
        ...req.body,
        teacherId: req.teacher._id
    });
    try{
        await subject.save();
        await subject.populate('students');
        res.send(subject);
    }catch (error) {
        res.status(500).send(error);
    }
});

router.post('/add/:subjectId', auth, async(req, res) => {
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
})