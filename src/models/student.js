const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

studentSchema.methods.generateAuthToken = async function () {
    const student = this
    const token = jwt.sign({ _id: student._id.toString() }, process.env.JWT_SECRET)
    student.tokens = student.tokens.concat({token})
    await student.save()
    return token
}

studentSchema.statics.findByCredentials = async (username, password) => {
    const student = await Student.findOne({username})

    if(!student){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, student.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return student
}

// Hashing password
studentSchema.pre('save', async function (next) {
    const student = this
    if(student.isModified('password')){
        student.password = await bcrypt.hash(student.password, 8)
    }
    next()
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student