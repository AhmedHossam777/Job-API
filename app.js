require('dotenv').config();
require('express-async-errors');


const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const cors = require('cors');

const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const jobsRouter = require('./routes/job');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');

const express = require('express');

const connectDB = require('./db/connect');

const app = express();

app.use(express.json());

app.set('trust proxy', 1); // trust first proxy
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(helmet());  // set security headers
app.use(xss()); // clean user input from malicious html code
app.use(cors()); // enable cors for all requests

// Allow requests from your front-end
app.use(
  cors({
    origin: 'http://127.0.0.1:8080', // replace with your front-end's URL
  })
);


app.use('/api/v1/jobs', authMiddleware.authMiddleware, authMiddleware.protect, jobsRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
