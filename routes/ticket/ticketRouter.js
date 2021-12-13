const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../utils/jwtMiddleware');
const upload = require('../utils/multerMiddleware')
const {
  createTicket,
  getAllTickets,
  getAllTicketsByProject,
  updateTicket,
  deleteTicket,
  uploadFileToTicket
} = require('./controller/ticketController');

router.post('/create-ticket', jwtMiddleware, createTicket);
router.post('/upload-file-to-ticket', jwtMiddleware, upload.single('file'), uploadFileToTicket);
router.get('/get-all-tickets', jwtMiddleware, getAllTickets);
router.get(
  '/get-all-tickets-by-project-id/:id',
  jwtMiddleware,
  getAllTicketsByProject
);
router.put('/update-ticket-by-id/:id', jwtMiddleware, updateTicket);
router.delete('/delete-ticket-by-id/:id', jwtMiddleware, deleteTicket);

module.exports = router;
