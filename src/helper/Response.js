class BaseResponse extends Error {
  constructor(message, errorType) {
    super(message);
    this.name = errorType;
  }
}

// Success Response Class Helper
class SuccessResponse {
  constructor(message, statusCode, data, paginationData) {
    this.success = true;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.paginationData = paginationData;
  }
}

// Error Response Class Helper
class ErrorResponse extends BaseResponse {
  constructor(message, errorType, errorCode, errors) {
    this.success = false;
    this.name = errorType;
    this.errors = errors;
    this.message = message;
    this.errorCode = errorCode;
  }
}

module.exports = {
  BaseResponse: BaseResponse,
  SuccessResponse: SuccessResponse,
  ErrorResponse: ErrorResponse,
};
