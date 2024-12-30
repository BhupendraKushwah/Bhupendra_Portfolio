const express = require('express')
const Router = express.Router();
const PorfolioController = require('../controllers/portfolio.Controller')

Router.get('/get_dashboard', PorfolioController.getDashboardData);
Router.get('/get_analytic', PorfolioController.getJobAnalytic);
Router.get('/get_profile', PorfolioController.getProfileData);
Router.get('/get_skills', PorfolioController.getSkills);
Router.get('/get_projects', PorfolioController.getProjects);
Router.get('/get_contact', PorfolioController.getContactDetails);
Router.post('/send-mail', PorfolioController.sendEmail);

module.exports = Router;