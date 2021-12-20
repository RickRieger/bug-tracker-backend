const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../utils/jwtMiddleware');
const upload = require('../utils/multerMiddleware');
const {
  createTicket,
  getTicket,
  getAllTickets,
  getAllTicketsByProject,
  updateTicket,
  deleteTicket,
  uploadFileToTicket,
  getAllAttachmentsByTicket,
  getSingleAttachmentFromS3bucket,
} = require('./controller/ticketController');

router.post('/create-ticket', jwtMiddleware, createTicket);
router.post(
  '/upload-file-to-ticket/:id',
  jwtMiddleware,
  upload.single('file'),
  uploadFileToTicket
);
router.get(
  '/get-all-attachments-by-ticket/:id',
  jwtMiddleware,
  getAllAttachmentsByTicket
);
router.get(
  '/get-single-attachment-by-key/:key',
  jwtMiddleware,
  getSingleAttachmentFromS3bucket
);
router.get('/get-all-tickets', jwtMiddleware, getAllTickets);
router.get('/get-ticket-by-id/:id', jwtMiddleware, getTicket);
router.get(
  '/get-all-tickets-by-project-id/:id',
  jwtMiddleware,
  getAllTicketsByProject
);
router.put('/update-ticket-by-id/:id', jwtMiddleware, updateTicket);
router.delete('/delete-ticket-by-id/:id', jwtMiddleware, deleteTicket);

module.exports = router;
