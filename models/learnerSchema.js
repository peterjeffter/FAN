const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  grade: {
    type: Number,
    required: [true, 'Must provide a class'],
    default: false,
  },
  age: {
    type: Number,
    required: [true, 'Must provide an age'],
    trim: true,
    maxlength: [3, 'Age cannot exceed 3 digits'],
  },
  language: {
    type: String,
    required: [true, 'Must provide a language'],
    trim: true,
  },
  parentname: {
    type: String,
    required: [true, 'Must provide name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Must provide email information'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Teacher ID is required'],
  },
  notes: [
    {
      note: { type: String, required: true, trim: true },
      teacher: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('students', learnerSchema);
