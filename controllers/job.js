
const getAllJobs = async (req, res) => {
  res.send('All Jobs');
}

const getJob = async (req, res) => {
  res.send('Single Job');
}

const createJob = async (req, res) => {
  res.send('Create Job');
}

const updateJob = async (req, res) => {
  res.send('Update Job');
}

const deleteJob = async (req, res) => {
  res.send('Delete Job');
}


module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}