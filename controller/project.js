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

exports.project_post = (req, res) => {
    const info = req.body;
    console.log('All requests: ', info)
    const project = new Project({
        name: info.name,
        owner: info.owner,
        description: info.description 
      })
    project.save(function (err, post) {
        if (err) { return next(err) }
        res.status(201).json({
            project:project,
            message: "project successfully posted"
        })
      })
}

exports.project_update = (req, res) => {
    const id = req.params.project_id
    Project.findByIdAndUpdate(
        id, 
        req.body,
        (err, project) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.status(201).json({
                project: project,
                message: "project suessfully updated"
            });
        }
    )
}

exports.project_remove = (req, res) => {
    const id = req.params.project_id
    Project.findByIdAndRemove(id, (err, project) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        return res.status(200).json({
            message: "Project successfully deleted",
            id: id
        });
    });
}