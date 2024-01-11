const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const ApiError = require('../errors/apiError');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find().sort('createdAt'); //? we will get the all the jobs of the specific user
  res.status(StatusCodes.OK).json({
    status: 'success',
    result: jobs.length,
    jobs,
  });
};

const getJob = async (req, res, next) => {
  const jobId = req.params.id;
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    return next(ApiError.create('NOT FOUND!', StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    job,
  });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;

  const job = req.body;

  const newJob = await Job.create(job);

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    newJob,
  });
};

const updateJob = async (req, res, next) => {
  const jobId = req.params.id;
  const data = req.body;

  const newJob = await Job.findOneAndUpdate({ _id: jobId }, data, {
    new: true,
    runValidators: true,
  });
  if (!newJob) {
    return next(ApiError.create('Not Found!', StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    newJob,
  });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  await Job.findOneAndDelete({ _id: jobId });
  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success',
  });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
