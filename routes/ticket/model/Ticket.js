const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    project: [{ type: mongoose.Schema.ObjectId, ref: 'project' }],
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
    developer: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ticket', ticketSchema);
