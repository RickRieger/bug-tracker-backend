const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  assignedPersonnel: [{ type: mongoose.Schema.ObjectId, ref: 'personnel' }],
  ticket: [{ type: mongoose.Schema.ObjectId, ref: 'ticket' }],
});

module.exports = mongoose.model('projectSchema', projectSchema);
