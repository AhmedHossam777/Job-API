class AppError extends Error {
  constructor() {
    super();
  }
  create(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
    return this;
  }
}

module.exports = new AppError();
