const mongoose = require('mongoose');

const ticketArchiveSchema = new mongoose.Schema(
  {
    archivedTickets: [{ type: mongoose.Schema.ObjectId, ref: 'ticket' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ticketArchive', ticketArchiveSchema);
