const mongoose = require('mongoose');

const ticketCommentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ticketComments', ticketCommentsSchema);
