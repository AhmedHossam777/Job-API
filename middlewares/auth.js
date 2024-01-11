const User = require('../models/User');
const ApiError = require('../errors/apiError');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.create('unauthorized', StatusCodes.UNAUTHORIZED));
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);


    const { id, username } = payload;
    req.user = { id, username };

    next();
  } catch (error) {
    return next(ApiError.create('unauthorized', StatusCodes.UNAUTHORIZED));
  }
};

const protect = async(req,res,next)=>{
  const userID = req.user.id;
  
  const job = await Job.findOne({createdBy:userID});
  if(!job){
    return next(ApiError.create('unauthorized', StatusCodes.UNAUTHORIZED));
  }
  next();
}



module.exports = {authMiddleware,protect};



