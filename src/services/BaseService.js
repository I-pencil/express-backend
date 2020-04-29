export default class BaseService {
  success(message, data = null) {
    return {
      success: true,
      message,
      data,
    };
  }
  fail(message, data = null) {
    return {
      success: false,
      message,
      data,
    };
  }
}
