const PorfolioManager = require('../managers/portfolio.Manager')

const getDashboardData = (req, res) => {
    PorfolioManager.getDashboardData(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const getJobAnalytic = (req, res) => {
    PorfolioManager.getDashboardData(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const getProfileData = (req, res) => {
    PorfolioManager.getProfileData(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const getSkills = (req, res) => {
    PorfolioManager.getSkills(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}
const getProjects = (req, res) => {
    PorfolioManager.getProjects(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}
const getContactDetails = (req, res) => {
    PorfolioManager.getContactDetails(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const sendEmail = (req, res) => {
    PorfolioManager.sendEmail(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}
module.exports = {
    getDashboardData,
    getJobAnalytic,
    getProfileData,
    getSkills,
    getProjects,
    getContactDetails,
    sendEmail
}