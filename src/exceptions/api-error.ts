module.exports = class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
  static badRequest(message: string) {
    return new ApiError(400, message);
  }
  static unauthorized() {
    return new ApiError(401, "Unauthorized");
  }

  static forbidden() {
    return new ApiError(403, "Forbidden");
  }
  static notFound() {
    return new ApiError(404, "Not found");
  }
  static internal() {
    return new ApiError(500, "Internal server error");
  }
};
