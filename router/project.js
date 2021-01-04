const express = require('express')
const router = express.Router()
const ProjectController = require('../controller/project')
const helper = require('../controller/helper')

router.get('/project', ProjectController.projects_all)
router.get('/project/:project_id', ProjectController.project_one)

router.post('/project',helper.authenticateToken, ProjectController.project_post, helper.add_to_user)

router.put('/project/apply/:project_id', helper.authenticateToken, ProjectController.project_apply, helper.add_to_user)
router.put('/project/deapply/:project_id', helper.authenticateToken, ProjectController.project_deapply, helper.add_to_user)
router.put('/project/approve/:project_id', helper.authenticateToken, ProjectController.project_member_approve, helper.add_to_user)
router.put('/project/delete/:project_id', helper.authenticateToken, ProjectController.project_member_delete, helper.add_to_user)

router.delete('/project/:project_id', helper.authenticateToken, ProjectController.project_remove, helper.add_to_user)

module.exports = router