const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');

const getAllJobs = async (req, res) => {
  res.send('All Jobs');
};

const getJob = async (req, res) => {
  res.send('Single Job');
};

const createJob = async (req, res) => {
  
  req.body.createdBy = req.user.id;
  console.log(req.user);
  
  const job = req.body;

  const newJob = await Job.create(job);

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    newJob,
  });
};

const updateJob = async (req, res) => {
  res.send('Update Job');
};

const deleteJob = async (req, res) => {
  res.send('Delete Job');
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
