const express = require('express');
const authMiddleware = require('./../middlewares/auth');


const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/job');

router.route('/').get(authMiddleware,getAllJobs).post(createJob);

router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
