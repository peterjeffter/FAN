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
  const {name, sort, fields, numericFilters}=req.query;
  const queryObject ={}
  if (name){
    queryObject.name = {$regex:name, $options:'i'}
  } 
  
  if(numericFilters){
    const operatorMap={
        '>':'$gt',
        '<':'$lt',
        '>=':'$gte',
        '<=':'$lte',
        '=':'$eq',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match)=>`-${operatorMap[match]}-`
    )
    const options = ['grade','age'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')    
    if (options.includes(field)){
        queryObject[field] = {[operator]:Number(value)}
      };
    });
  }
  let result = student.find({teacher: req.user.userId});
  if (sort){
    const sortlist = sort.split(',').join(' ')
    result = result.sort(sortlist)
  }else{
    result=result.sort('createdat')
  }

  if (fields){
    const fieldlist = fields.split(',').join(' ')
    result = result.select(fieldlist)

  }
  const page = Number(req.query.page)|| 1
  const limit = Number(req.query.limit)|| 200
  const skip = (page-1) *limit
  console.log(queryObject)
  result = result.skip(skip).limit(limit)
  
 const learner = await result
 
  if (!learner) {    
    throw new (NotFoundError('student does not exist'));
  }
  
  return res.json(learner);
});




router.post('/addlearner', async (req, res)=>{
  req.body.teacher = req.user.userId;
  const learner=  await student.create(req.body)
  
  if (!req.body){
    throw new (BadRequestError('Fill all inputs please'))
  }  
  return res.status(StatusCodes.CREATED).json(learner);
})


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