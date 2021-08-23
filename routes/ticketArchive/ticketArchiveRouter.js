const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../utils/jwtMiddleware');

const {
  archiveTicket,
  unArchiveTicket,
  getAllArchivedTickets,
} = require('./controller/archiveProjectController');

router.post('/archive-ticket', jwtMiddleware, archiveTicket);
router.get('/undo-archive-ticket', jwtMiddleware, unArchiveTicket);
router.get('/get-all-archived-tickets', jwtMiddleware, getAllArchivedTickets);

module.exports = router;
