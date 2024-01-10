const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      maxlength: 50,
      minlength: 1,
    },
    position: {
      type: String,
      required: [true, 'Please provide a position'],
      maxlength: 50,
      minlength: 1,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true } //? add  createdAt, updatedAt automatically
  ); 

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
