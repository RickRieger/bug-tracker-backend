const mongoose = require('mongoose');

const ticketCommentsSchema = new mongoose.Schema(
  {
    ticket: { type: mongoose.Schema.ObjectId, ref: 'ticket' },
    comment: {
      type: String,
    },
    commenter:{ type: Object},
  },
  { timestamps: true }
);

module.exports = mongoose.model('ticketComments', ticketCommentsSchema);
