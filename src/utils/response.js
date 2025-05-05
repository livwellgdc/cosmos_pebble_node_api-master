import httpStatus from 'http-status';
import ApiError from './ApiError';
import config from '../config/config';

/**
 * Return response with success
 * @param data array of response data
 * @param code standerd http_code, default 200
 * @param message response message
 * @author Toquir Alam <toquir.alam@timesinternet.in>
 */
const success = (data, code = httpStatus.OK, message = 'success') => {
  return {
    code,
    message,
    data,
  };
};

/**
 * Return response with not found
 * @param message response message
 * @param code standard http_code, default 404
 * @param data array of response data
 * @author Toquir Alam <toquir.alam@timesinternet.in>
 */
const notFound = (message = 'not found', code = httpStatus.NOT_FOUND, data = []) => {
  return {
    code,
    message,
    data,
  };
};

/**
 * Return response with exception
 * @param message response message
 * @param code standard http_code, default 500
 * @author Mohan Gupta <mohan.gupta@mensabrands.com>
 */
const exception = (message = 'something went wrong', code = httpStatus.INTERNAL_SERVER_ERROR, isOperational = false) => {
  if (!(isOperational || config.env === 'development') && code !== 500) {
    throw new ApiError(code, 'something went wrong');
  }
  throw new ApiError(code, message);
};
module.exports = {
  success,
  notFound,
  exception,
};
