const express = require('express');
const Router = express.Router();

Router.use('/superadmin/', require('./superAdmin.route'));
Router.use('/user/', require('./portfolio.route'))
module.exports = Router;