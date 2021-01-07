const Project = require('../model/project')


exports.projects_all = (req, res) => {
    Project.find()
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

exports.project_one = (req, res) => {
    const id = req.params.project_id;
    console.log('project id: ', id)
    Project.find({_id: id})
        .then(result => [
            res.status(200).json({
                project: result
            })
        ]).catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}

exports.project_post = (req, res, next) => {
    console.log('project posting route')
    const info = req.body;
    console.log('All requests: ', info)
    const project = new Project({
        name: info.name,
        owner: req.user._id,
        description: info.description 
      })
    project.save(function (err, post) {
        if (err) { return next(err) }
        res.status(201).json({
            project:post,
            message: "project successfully posted"
        })
        req.project = post
        req.option = "post"
        next()
    })
}

exports.project_apply = (req, res, next) => {
    const id = req.params.project_id
    console.log('Project application route')
    console.log('user id: ', req.user._id)
    console.log('Project id: ', id)
    Project.findById(
        id, 
        (err, project) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            // const userid = req.user._id
            // console.log('User id: ', userid)
            // console.log('Applicants id: ', project.applicants)
            if (project.applicants.includes(req.user._id)) {
                return res.status(500).json({
                    message: "You have already applied for this project. Wait for Owner approval"
                })
            } else {
                project.applicants.push(req.user._id);
                project.save(function (err, post) {
                    if (err) { return next(err) }
                    res.status(201).json({
                        project:project,
                        message: "project successfully applied"
                    })
                  })
                req.project = project
                req.option = "apply"
                next()
            }
        }
    )
}

exports.project_deapply = (req, res,next) => {
    const id = req.params.project_id
    console.log('Project application withdrawn route')
    Project.findById(
        id, 
        (err, project) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            if (project.applicants.includes(req.user._id) == false) {
                return res.status(500).json({
                    message: "You have not applied for this project. Withdrawn failed"
                })
            } else {
                project.applicants.pull(req.user._id);
                project.save(function (err, post) {
                    if (err) { return next(err) }
                    res.status(201).json({
                        project:project,
                        message: "project application successfully withdrawn"
                    })
                  })
                req.project = project
                req.option = "deapply"
                next()
            }
        }
    )
}

exports.project_member_approve = (req, res,next) => {
    const id = req.params.project_id
    console.log('Project member application approval route')
    Project.findById(
        id, 
        (err, project) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            if (project.owner != req.user._id) {
                return res.status(500).json({
                    message: "You don't own this project. Can't approve members"
                })
            } else {
                // console.log('Request body: ', req.body.userId)
                if (project.members.includes(req.body.userId)) {
                    return res.status(500).json({
                        message: "You have already approved this member."
                    })
                } else {
                    project.members.push(req.body.userId);
                    project.save(function (err) {
                        if (err) { return next(err) }
                        res.status(201).json({
                            project:project,
                            message: "project member approved"
                        })
                      })
                    req.project = project
                    req.option = "approve"
                    next()
                }
            }
        }
    )
}

exports.project_member_delete = (req, res, next) => {
    const id = req.params.project_id
    console.log('Project member deletion route')
    Project.findById(
        id, 
        (err, project) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            if (project.owner != req.user._id) {
                return res.status(500).json({
                    message: "You don't own this project. Can't delete members"
                })
            } else {
                if (project.members.includes(req.body.userId) == false) {
                    return res.status(500).json({
                        message: "Applicant is not yet a member."
                    })
                } else {
                    project.members.pull(req.body.userId);
                    project.save(function (err) {
                        if (err) { return next(err) }
                        res.status(201).json({
                            project: project,
                            message: "project member deleted"
                        })
                      })
                    req.project = project
                    req.option = "delete"
                    next()
                }
            }
        }
    )
}

exports.project_remove = (req, res,next) => {
    const id = req.params.project_id
    Project.findByIdAndRemove(id, (err, project) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        if (req.user._id == project.owner) {
            res.status(200).json({
                message: "Project successfully deleted",
                id: id,
                project: project
            })
            req.project = project
            req.option = "remove"
            next()
        } else {
            res.status(401).json({
                message: "Unable to delete. You don't own this project"
            })
        }
    });
}