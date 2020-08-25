const Subject = require('../models/subject');

const subjectValidate = async(req, res, next) => {
    try{
        const subject = await Subject.findOne({_id: req.params.id, students: req.student._id});
        if(!subject) throw new Error();
        req.subject = subject;
        next();
    }catch(e) {
        res.status(401).send({ error: 'Not enrolled in the subject.' })
    }
}

module.exports = subjectValidate;