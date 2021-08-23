const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../utils/jwtMiddleware');

const {
  archiveProject,
  unArchiveProject,
  getAllArchivedProjects,
} = require('./controller/archiveProjectController');

router.post('/archive-project', jwtMiddleware, archiveProject);
router.get('/undo-archive-project', jwtMiddleware, unArchiveProject);
router.get('/get-all-archived-projects', jwtMiddleware, getAllArchivedProjects);

module.exports = router;
