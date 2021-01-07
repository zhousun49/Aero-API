const Project = require('../model/project')
//From User's perspective, all ways users can interact with projects
//Goal is to find projects

exports.projects_owned = (req, res) => {
    console.log('Getting projects owned by a user')
    // console.log(req.user)
    Project.find({owner: req.user._id})
        .then(result => [
            res.status(200).json({
                count: result.length,
                projects: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}

exports.projects_applied = (req, res) => {
    console.log('Getting projects applied by a user')
    Project.find({
        '_id': { $in: req.user.applied_projects}})
        .select('name owner description date')
        .then(result => [
            res.status(200).json({
                count: result.length,
                projects: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}

exports.projects_member = (req, res) => {
    console.log('Getting projects where user is a member of')
    Project.find({
        '_id': { $in: req.user.project_member}})
        .select('name owner description date members')
        .then(result => [
            res.status(200).json({
                count: result.length,
                projects: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}