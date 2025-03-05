
const express = require('express')
require('dotenv').config()
const cors = require('cors');
const authentication = require('./middleware/authentication')
const auth = require('./routes/authentication')
const app = express()
const allowedOrigins = [
  "https://fan-k9799yq4r-0ngutor0s-projects.vercel.app", 
  "https://fan-msxtf2qxc-0ngutor0s-projects.vercel.app",
  "https://fan-kea8gglq9-0ngutor0s-projects.vercel.app ",
  "https://fan-*.vercel.app" // Allow all Vercel frontend subdomains
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => origin.startsWith("https://fan-") && origin.endsWith(".vercel.app"))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
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