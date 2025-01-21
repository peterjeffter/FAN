
const express = require('express')
require('dotenv').config()
const cors = require('cors');
const authentication = require('./middleware/authentication')
const auth = require('./routes/authentication')
const app = express()
app.use(cors({
  origin: '*',
}));

const funcs = require('./routes/funcs')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
const connectDB = require('./db/connect')
app.use('/speak/', auth)
app.use('/speak/', authentication, funcs)


app.use(express.static('public'))



const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(8000, ()=>{console.log('PORT: 8000')})
  } catch (error) {
    console.log(error)
  }
}



start()