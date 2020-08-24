const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    videoId: {
        type: String,
        required: true,
        trim: true
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    }
}, {
    timestamps: true
})

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;