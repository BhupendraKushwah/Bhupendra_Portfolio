const express = require('express');
const Router = express.Router();
const upload = require('../configs/multer.config')
const superAdminController = require('../controllers/superAdmin.Controller');
const authenticateJWT = require('../middleware/auth.middleware');

Router.post('/login', superAdminController.loginUser)
Router.post('/update-password',authenticateJWT,superAdminController.UpdatePassword)
Router.post('/add-project-details', authenticateJWT, upload.single('projectImage', 1), superAdminController.addProjects)
Router.post('/manage_profile', authenticateJWT, upload.fields([{ name: 'file', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), superAdminController.manageProfile);
Router.post('/add-skills', authenticateJWT, upload.single('skill_image', 1), superAdminController.addSkill)

// get route 
Router.get('/getProfileData', authenticateJWT, superAdminController.getProfileData);
Router.get('/getProjectData', authenticateJWT, superAdminController.getProjectData);
Router.get('/getSkillData', authenticateJWT, superAdminController.getSkillData);

//delete route 
Router.delete('/delete_skill', authenticateJWT, superAdminController.deleteSkill);

//edit route
Router.put('/edit_skill',upload.single('skill_image', 1), authenticateJWT, superAdminController.editSkill);

module.exports = Router;