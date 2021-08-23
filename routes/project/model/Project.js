const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'low',
    },
    completed: {
      type: Boolean,
      default: 'false',
    },
    archive: {
      type: Boolean,
      default: 'false',
    },
    projectManager: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    developer: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    tickets: [{ type: mongoose.Schema.ObjectId, ref: 'ticket' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('project', projectSchema);
