const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['admin', 'projectManager', 'developers', 'submitter'],
      default: 'submitter',
    },
    password: {
      type: String,
      required: true,
    },
    projects: [{ type: mongoose.Schema.ObjectId, ref: 'project', unique: true }],
    tickets: [{ type: mongoose.Schema.ObjectId, ref: 'ticket' , unique: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
