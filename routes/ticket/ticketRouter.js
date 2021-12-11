const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../utils/jwtMiddleware');

const {
  createTicket,
  getAllTickets,
  getAllTicketsByProject,
  updateTicket,
  deleteTicket,
} = require('./controller/ticketController');

router.post('/create-ticket', jwtMiddleware, createTicket);
router.get('/get-all-tickets', jwtMiddleware, getAllTickets);
router.get(
  '/get-all-tickets-by-project-id/:id',
  jwtMiddleware,
  getAllTicketsByProject
);
router.put('/update-ticket-by-id/:id', jwtMiddleware, updateTicket);
router.delete('/delete-ticket-by-id/:id', jwtMiddleware, deleteTicket);

module.exports = router;
