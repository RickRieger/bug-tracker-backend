const mongoose = require('mongoose');

const projectArchiveSchema = new mongoose.Schema(
  {
    archivedProjects: [{ type: mongoose.Schema.ObjectId, ref: 'project' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('projectArchive', projectSchema);
