const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      unique: true,
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
      enum: ['Low', 'Medium', 'High', 'Urgent'],
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
    developers: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
    tickets: [{ type: mongoose.Schema.ObjectId, ref: 'ticket' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('project', projectSchema);
// if (project){
//   const priorityLevel = project.priority;
//   let color = ''
//   switch(priorityLevel){
//     case 'Urgent':
//       color='error.dark'
//       break;
//     case 'High':
//       color='error.light'
//       break;
//     case 'Medium':
//       color='warning.light'
//       break;
//     case 'Low':
//       color='info.light'
//       break;
//   }

// }