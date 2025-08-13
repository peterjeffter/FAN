const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authentication = require('./middleware/authentication');
const auth = require('./routes/authentication');
const funcs = require('./routes/funcs');

const app = express();

// ✅ Fix CORS: Allow frontend origin dynamically or allow all (*)
app.use(cors({
  origin: "https://fan-neon.vercel.app/",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const connectDB = require('./db/connect');

app.use('/speak/', auth);
app.use('/speak/', authentication, funcs);

app.use(express.static('public'));

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => { console.log('PORT: 8000') });
  } catch (error) {
    console.log(error);
  }
};

start();
