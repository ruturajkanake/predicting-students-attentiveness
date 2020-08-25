const mongoose = require('mongoose');

const studentRecordSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subject'
    },
    lectureId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Lecture'
    },
    recordX: {
        type: Array,
        required: true
    },
    recordY: {
        type: Array,
        required: true
    }
}, {
    timestamps: true
})

const StudentRecord = mongoose.model('StudentRecord', studentRecordSchema);

module.exports = StudentRecord;