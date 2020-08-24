const express = require('express');
const auth = require('../middleware/teacher');
const Teacher = require('../models/teacher');
const router = new express.Router();

router.post('/register', async(req, res) => {
    try{
        const isUsername = await Teacher.findOne({username: req.body.username});
        if(isUsername){
            throw 'User name already taken';
        }
        const teacher = new Teacher(req.body);
        await teacher.save();
        const token = await teacher.generateAuthToken();
        res.status(201).json({teacher, token});
    } catch(error){
        res.status(400).send(error);
    }
})

router.post('/login', async(req, res) => {
    try {
        const teacher = await Teacher.findByCredentials(req.body.username, req.body.password);
        const token = await teacher.generateAuthToken();
        res.status(200).send({ teacher, token });
    } catch(error){
        res.status(400).send(error);
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.teacher.tokens = req.teacher.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.teacher.save()
        res.send(req.teacher)
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router