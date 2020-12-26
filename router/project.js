const express = require('express')
const router = express.Router()
const ProjectController = require('../controller/project')

router.get('/project', ProjectController.projects_all)

router.get('/project/:project_id', ProjectController.project_one)

router.post('/project', ProjectController.project_post)

router.put('/project/:project_id', ProjectController.project_update)

router.delete('/project/:project_id', ProjectController.project_remove)

module.exports = router