const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const teacherSchema = new mongoose.Schema({
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

teacherSchema.methods.generateAuthToken = async function () {
    const teacher = this
    const token = jwt.sign({ _id: teacher._id.toString() }, process.env.JWT_SECRET)
    teacher.tokens = teacher.tokens.concat({token})
    await teacher.save()
    return token
}

teacherSchema.statics.findByCredentials = async (username, password) => {
    const teacher = await Teacher.findOne({username})

    if(!teacher){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, teacher.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return teacher
}

// Hashing password
teacherSchema.pre('save', async function (next) {
    const teacher = this
    if(teacher.isModified('password')){
        teacher.password = await bcrypt.hash(teacher.password, 8)
    }
    next()
})

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher