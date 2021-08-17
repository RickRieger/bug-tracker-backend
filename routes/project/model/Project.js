const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      title: {
        type: String,
      },
    },
    assignedPersonnel: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    ticket: [{ type: mongoose.Schema.ObjectId, ref: 'ticket' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('projectSchema', projectSchema);
