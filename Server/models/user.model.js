const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    street: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    zip_code: {
        type: String,
        required: true,
        trim: true,
    },
    contactEmail: {
        type: String,
        required: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Invalid email format'],
    },
    experience: {
        type: Number,
        required: true,
        min: 0,
    },
    projectsCount: {
        type: Number,
        required: true,
        min: 0,
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    jobBrief: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    socialLinks: {
        github: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, 'Invalid URL format'],
        },
        linkedIn: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, 'Invalid URL format'],
        },
        x: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, 'Invalid URL format'],
        },
        instagram: {
            type: String,
            required: true,
            match: [/^https?:\/\/.+/, 'Invalid URL format'],
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)