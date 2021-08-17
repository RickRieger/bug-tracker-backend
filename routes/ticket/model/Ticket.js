const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    details: {
      type: String,
    },
    assignedPersonnel: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    priorityLevel: {
      type: String,
      enum: ['urgent', 'high', 'medium', 'low'],
      default: 'high',
    },
    ticketType: {
      type: String,
      enum: ['bug', 'task', 'new-feature'],
      default: ['bug'],
    },
    comments: [{ type: mongoose.Schema.ObjectId, ref: 'ticketComments' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ticket', ticketSchema);
