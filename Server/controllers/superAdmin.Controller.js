const superAdminManager = require('../managers/superAdmin.Manager')

const loginUser = (req, res) => {
    superAdminManager.loginUser(req.body)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const UpdatePassword = (req, res) => {
    superAdminManager.UpdatePassword(req.body)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}


const manageProfile = (req, res) => {
    superAdminManager.manageProfile(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}
const addSkill = (req, res) => {
    superAdminManager.addSkill(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}
const addProjects = (req, res) => {
    superAdminManager.addProjects(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const getProfileData = (req, res) => {
    superAdminManager.getProfileData(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const getProjectData = (req, res) => {
    superAdminManager.getProjectData(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const getSkillData = (req, res) => {
    superAdminManager.getSkillData(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const deleteSkill = (req, res) => {
    superAdminManager.deleteSkill(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

const editSkill = (req, res) => {
    superAdminManager.editSkill(req)
        .then(result => res.status(result.code).send(result.data))
        .catch(error => res.status(500).send(error))
}

module.exports = {
    loginUser,
    UpdatePassword,
    manageProfile,
    addSkill,
    addProjects,
    getProfileData,
    getProjectData,
    getSkillData,
    deleteSkill,
    editSkill
}