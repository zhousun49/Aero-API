const User = require('../model/user')
//From Project's perspective, all ways projects can interact with users
//Goal is to find users

exports.project_owner = (req, res) => {
    console.log('Getting information about user who owns this project')
    // console.log('Project id: ', req.params.projectId)
    User.find({'owned_projects': { $in: [req.params.projectId]}})
    .select('name email owned_projects')
    .then(result => [
        res.status(200).json({
            user: result
        })
    ]).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
}

exports.project_member = (req, res) => {
    console.log('Getting information about members of this project')
    // console.log('Project id: ', req.params.projectId)
    User.find({'project_member': { $in: [req.params.projectId]}})
    .then(result => [
        res.status(200).json({
            count: result.length,
            user: result
        })
    ]).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
}

exports.project_applicant = (req, res) => {
    console.log('Getting information about applicants of this project')
    // console.log('Project id: ', req.params.projectId)
    console.log('Project owner: ', req.project.owner)
    console.log('User logged in: ', req.user._id)
    if (req.project.owner == req.user._id) {
        User.find({'applied_projects': { $in: [req.params.projectId]}})
        .then(result => [
            res.status(200).json({
                count: result.length,
                user: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
    } else {
        res.status(500).json({
            message: "You don't own this project. Can't view applicants"
        })
    }
}