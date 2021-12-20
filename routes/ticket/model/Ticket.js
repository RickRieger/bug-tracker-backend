const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.ObjectId, ref: 'project' },
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    priorityLevel: {
      type: String,
      enum: ['Urgent', 'High', 'Medium', 'Low'],
      default: 'High',
    },
    ticketType: {
      type: String,
      enum: ['Bug', 'Task', 'New Feature'],
      default: 'Bug',
    },
    ticketStatus: {
      type: String,
      enum: [
        'New',
        'Unassigned',
        'Development',
        'Testing',
        'Resolved',
        'Archived',
      ],
      default: 'New',
    },
    attachments: [''],
    comments: [{ type: mongoose.Schema.ObjectId, ref: 'ticketComments' }],
    developer: { type: mongoose.Schema.ObjectId, ref: 'user' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ticket', ticketSchema);
