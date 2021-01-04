const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    owned_projects: [mongoose.Types.ObjectId],
    applied_projects: [mongoose.Types.ObjectId],
    project_member: [mongoose.Types.ObjectId]
})

const User = mongoose.model('User', UserSchema);
module.exports = User;