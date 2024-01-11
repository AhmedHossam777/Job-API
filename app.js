require('dotenv').config();
require('express-async-errors');

const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const jobsRouter = require('./routes/job');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');

const express = require('express');

const connectDB = require('./db/connect');

const app = express();
app.use(express.json());

app.use('/api/v1/jobs', authMiddleware.authMiddleware, authMiddleware.protect, jobsRouter);
app.use('/api/v1/auth', authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

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
