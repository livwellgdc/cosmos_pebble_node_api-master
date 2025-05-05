import fetch from 'node-fetch';

const request = (url, params = {}, headers = {}, method = 'GET', responseType) => {
  let options = {
    method,
  };
  options.headers = headers;
  options.mode = 'no-cors';
  if ('GET' === method) {
    url += '?' + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  return fetch(url, options).then(async (response) => {
    let data;
    if (responseType == 'text') {
      data = await response.text();
    } else {
      data = await response.json();
    }
    return { status: response.status, data: data };
  });
};

const GET = (url, params, headers = {}, responseType = 'json') => request(url, params, headers, 'GET', responseType);
const POST = (url, params, headers = {}, responseType = 'json') => request(url, params, headers, 'POST', responseType);
const PUT = (url, params, headers = {}, responseType = 'json') => request(url, params, headers, 'PUT', responseType);

module.exports = {
  GET,
  POST,
  PUT,
};
