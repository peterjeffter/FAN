const mongoose = require('mongoose')
const { type } = require('os')

const learnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters'],
  },
  grade: {
    type: Number,
    required: [true, 'must provide class'],
    default: false,
  },
  age:{
    type: Number,
    required: [true, 'must provide age'],
    trim: true,
    maxlength: [3, 'age can not be more than 3 characters'],
  },
  language:{
    type: String,
    required: [true, 'must provide language'],
    trim: true,
  },
  parentname:{
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters'],
  },
  contactinfo:{
    type: String,
    required: [true, 'must provide information'],
    trim: true,
  },
  createdat:{
    type: Date,
    default: Date.now()
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'error']
  },
  note:{
    type: String,
    required: [false],
    trim: true,
  },
})
module.exports= mongoose.model('students', learnerSchema)