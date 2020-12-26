const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: {type: String, required: true},
    date: { type: Date, default:Date.now() },
    views: {type: Number, default: 0},
    owner: {type: String, required: true},
    applicants: [String],
    members: [String],
    interests: {type: Number, default: 0},
})

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;