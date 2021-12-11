const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.ObjectId, ref: 'project' },
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    priorityLevel: {
      type: String,
      enum: ['Urgent', 'High', 'Medium', 'Low'],
      default: 'high',
    },
    ticketType: {
      type: String,
      enum: ['bug', 'task', 'new-feature'],
      default: 'bug',
    },
    comments: [{ type: mongoose.Schema.ObjectId, ref: 'ticketComments' }],
    developers: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ticket', ticketSchema);
