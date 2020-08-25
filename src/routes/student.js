const express = require('express');
const auth = require('../middleware/student');
const Student = require('../models/student');
const router = new express.Router();

router.post('/register', async(req, res) => {
    try{
        const isUsername = await Student.findOne({username: req.body.username});
        if(isUsername){
            throw 'User name already taken';
        }
        const student = new Student(req.body);
        await student.save();
        const token = await student.generateAuthToken();
        res.status(201).json({student, token});
    } catch(error){
        res.status(400).send(error);
    }
})

router.post('/login', async(req, res) => {
    try {
        const student = await Student.findByCredentials(req.body.username, req.body.password);
        const token = await student.generateAuthToken();
        res.status(200).send({ student, token });
    } catch(error){
        res.status(400).send(error);
    }
})

router.get('/me', auth, async(req, res) => {
    try{
        res.send(req.student);
    }catch(e){
        res.status(400).send(e);
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.student.tokens = req.student.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.student.save()
        res.send(req.student)
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router