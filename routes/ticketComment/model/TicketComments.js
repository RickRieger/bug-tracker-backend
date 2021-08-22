const mongoose = require('mongoose');

const ticketCommentsSchema = new mongoose.Schema(
  {
    ticket: { type: mongoose.Schema.ObjectId, ref: 'ticket' },
    comment: {
      type: String,
    },
    whoMadeComment: '',
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('ticketComments', ticketCommentsSchema);
