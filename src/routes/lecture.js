const express = require('express');
const Lecture = require('../models/lecture');
const StudentRecord = require('../models/student-record');
const teacherAuth = require('../middleware/teacher');
const studentAuth = require('../middleware/student');
const subjectValidate = require('../middleware/subject');
const router = new express.Router();

function youtubeUrlParser (url) {
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

router.post('/create/:id', teacherAuth, async(req, res) => {
    try {
        const videoId = youtubeUrlParser(req.body.url);
        if(!videoId) throw 'URL is invalid';
        const data = {
            topic: req.body.topic,
            description: req.body.description,
            videoId,
            subjectId: req.params.id,
            teacherId: req.teacher._id
        }
        const lecture = new Lecture(data);
        await lecture.save();
        const lectures = await Lecture.find({teacherId: req.teacher._id});
        res.status(200).send(lectures);
    } catch (error){
        res.status(500).send(error);
    }
})

router.get('/teacher/:id', teacherAuth, async(req, res) => {
    try{
        const lectures = await Lecture.find({teacherId: req.teacher._id, subjectId: req.params.id});
        if(!lectures) throw 'No lectures present';
        res.send(lectures);
    }catch(error) {
        res.status(400).send(error)
    }
})

router.get('/student/:id', studentAuth, subjectValidate, async(req, res) => {

    try{
        const completed = await StudentRecord.find({studentId: req.student._id, subjectId: req.params.id});
        let completedVideos = [];
        let completedList = [];
        for(const record of completed){
            await record.populate('lectureId').execPopulate();
            completedList.push(record.lectureId);
            completedVideos.push(record.lectureId.videoId);
        }
        const incomplete = await Lecture.find({subjectId: req.params.id, videoId: { $nin: completedVideos}});
        res.send({complete: completedList, incomplete: incomplete});

    }catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;