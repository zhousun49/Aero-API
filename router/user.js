
const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')
const ProjectUserController = require('../controller/projectuser')
const helper = require('../controller/helper')

router.get('/user/loggedin', helper.authenticateToken, UserController.getUserinfo)

router.get('/user/projects/:projectId', ProjectUserController.project_owner)
router.get('/user/projects/member/:projectId', ProjectUserController.project_member)
router.get('/user/projects/applicant/:projectId', helper.authenticateToken, helper.pass_project_info, ProjectUserController.project_applicant)

router.post('/user/signup', UserController.signup)
router.post('/user/login', UserController.login)

router.delete('/user/logout', helper.authenticateToken, UserController.logout)

module.exports = router