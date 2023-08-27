class CustomError extends Error {
  constructor(message, params) {
    super(message);
    this.name = 'CustomError';
    this.params = params;
  }
}

module.exports = CustomError;
