const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../utils/jwtMiddleware');

const {
  createComment,
  getAllTicketComments,
  updateComment,
  deleteComment,
} = require('./controller/ticketCommentController');

router.post('/create-comment', jwtMiddleware, createComment);
router.get(
  '/get-all-comments-by-ticket/:id',
  jwtMiddleware,
  getAllTicketComments
);
router.put('/update-comment/:id', jwtMiddleware, updateComment);
router.delete('/delete-comment/:id', jwtMiddleware, deleteComment);

module.exports = router;
