const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../utils/jwtMiddleware');

const {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getProjectById
} = require('./controller/projectController');

router.post('/create-project', jwtMiddleware, createProject);
router.get('/get-all-projects', jwtMiddleware, getAllProjects);
router.put('/update-project-by-id/:id', jwtMiddleware, updateProject);
router.delete('/delete-project-by-id/:id', jwtMiddleware, deleteProject);
router.get('/get-project-by-id/:id', jwtMiddleware, getProjectById);

module.exports = router;
