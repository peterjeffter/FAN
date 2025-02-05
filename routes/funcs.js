const express  = require('express')
const router = express.Router()
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const student = require('../models/learnerSchema.js')
const asyncWrapper = require('../async.js')

const mongoose = require('mongoose')


router.get('/users', async (req, res)=>{
const instructor = await student.find({teacher:req.user.userId})
return res.send(instructor)
})


router.get('/', async (req, res) => {
  const { name, page = 1, limit = 200 } = req.query;
  const queryObject = { teacher: req.user.userId }; // Ensure students are filtered by the teacher's ID

  // Search by name (case-insensitive)
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  try {
    // Find students based on the query object
    let result = student.find(queryObject);

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    result = result.skip(skip).limit(Number(limit));

    const learners = await result;

    // Respond with the learners array
    return res.status(200).json(learners);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});





router.post('/addlearner', async (req, res)=>{
  req.body.teacher = req.user.userId;
  const learner=  await student.create(req.body)
  
  if (!req.body){
    throw new (BadRequestError('Fill all inputs please'))
  }  
  return res.status(StatusCodes.CREATED).json(learner);
})

router.post('/notes/:studentID', async (req, res) => {
  try {
    const teacherId = req.user.userId; // Extracted from JWT middleware
    const { note } = req.body;
    const { studentID } = req.params;

    // Validate input
    if (!studentID || !note) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Student ID and note content are required.' });
    }

    // Check if the student exists and belongs to the teacher
    const learner = await student.findOne({ _id: studentID, teacher: teacherId });
    if (!learner) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'You do not have access to this student or the student does not exist.' });
    }

    // Add the note with the required teacher field
    const newNote = { note, studentID, teacher: teacherId };
    learner.notes.push(newNote); // Assuming `notes` is an array in the Student model

    // Save the updated student document
    await learner.save();

    // Respond with the created note
    return res.status(StatusCodes.CREATED).json(newNote);
  } catch (error) {
    console.error('Error adding note:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while adding the note.' });
  }
});




router.get('/notes/:studentID', async (req, res) => {
  try {
    const teacherId = req.user.userId; // Extracted from JWT middleware
    const { studentID } = req.params;

    // Validate input
    if (!studentID) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Student ID is required.' });
    }

    // Check if the student exists and belongs to the teacher
    const learner = await student.findOne({ _id: studentID, teacher: teacherId });

    if (!learner) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: 'You do not have access to this student or the student does not exist.',
      });
    }

    // Retrieve notes
    const oldNotes = learner.notes; // Assuming `notes` is an array in the `Student` model

    // Respond with the notes
    return res.status(StatusCodes.OK).json(oldNotes);
  } catch (error) {
    console.error('Error getting notes:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while retrieving notes.',
    });
  }
});


router.patch(`/:studentID`,  asyncWrapper(async (req, res, next)=>{
  const {studentID} = req.params  
  if (!mongoose.Types.ObjectId.isValid(studentID)) {
    return res.status(400).send({ error: 'Invalid student ID' });}
    const learner = await student.findOneAndUpdate({_id: studentID}, req.body, {
    new:true, runValidators:true})
    if (!learner) {   
      return next(NotFoundError('student does not exist'));
    }  
    res.status(StatusCodes.OK).json(learner) 
}))


router.delete('/:studentID', asyncWrapper(async (req, res, next) => {
  const { studentID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(studentID)) {
    return res.status(400).send({ error: 'Invalid student ID' });}
   const learner = await student.findByIdAndDelete(studentID);
   if (!learner) {    
    return next(NotFoundError('student does not exist', 404));
  }
  res.status(StatusCodes.OK).send({ message: 'student deleted successfully', learner}); 
}))


module.exports = router