class ApiError extends Error {
  constructor(statusCode, messaage) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ApiError;