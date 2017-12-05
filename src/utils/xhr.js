import Rest from 'grommet/utils/Rest';
import request from 'superagent';

const timeout = 150000; // 150 secs
const defaultHeaders = {
  Accept: 'application/json',
  'X-API-Version': '1',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache', // to avoid caching
  Pragma: 'no-cache',
};

/**
* Handles special behavior based on errors
*   401 -> redirect to loginUrl
*
* default to return err, passes to Promise.reject()
*/

function handleXHRError(err, res) {
  if (res !== undefined) {
    let body = {};

    try {
      body = JSON.parse(res.text);
    } catch (error) {
      body = { error };
    }

    if (res.status === 401 && body.loginUrl) {
      window.parent.location = body.loginUrl;
    }
  } else {
    res = { body: { error: 'Server unavailable' } }; // eslint-disable-line
  }
  return res;
}

function handleResponse(res) {
  if (res.headers['x-auth-token']) {
    const authToken = res.headers['x-auth-token'];
    window.localStorage.setItem('authToken', authToken);
  }
  if (res.headers['refresh-token']) {
    const refreshToken = res.headers['refresh-token'];
    window.localStorage.setItem('refreshToken', refreshToken);
  }
  return res;
}

export default ({ type, uri, data, headers }) => {
  const head = headers;
  // Special handling is required for multipart form handling
  // https://github.com/grommet/grommet/pull/501
  // https://github.com/visionmedia/superagent/issues/746
  let multipartForm = false;
  if (head && head['Content-Type'] && head['Content-Type'] === 'multipart/form-data') {
    multipartForm = true;
    delete head['Content-Type'];
    delete defaultHeaders['Content-Type'];
  }
  // delete tokens if any
  delete defaultHeaders['X-Auth-Token'];
  delete defaultHeaders['Refresh-Token'];
  // add tokens
  const authToken = window.localStorage.getItem('authToken');
  const refreshToken = window.localStorage.getItem('refreshToken');

  if (authToken && refreshToken) {
    defaultHeaders['X-Auth-Token'] = authToken;
    defaultHeaders['Refresh-Token'] = refreshToken;
  }

  Rest.setHeaders(Object.assign(defaultHeaders, head));
  Rest.setTimeout(timeout);
  return new Promise((resolve, reject) => {
    if (multipartForm) {
      if (Object.prototype.toString.call(data) === '[object FormData]') {
        Rest[type](uri, data)
        .end((err, res) => (err ? reject(handleXHRError(err, res))
          : resolve(handleResponse(res))));
      } else {
        request.post(uri)
        .set(Object.assign(defaultHeaders, head))
        .field('name', data.name)
        .attach('file', data)
        .end((err, res) => (err ? reject(handleXHRError(err, res))
          : resolve(handleResponse(res))));
      }
    } else if (type === 'del') {
      const op = Rest[type](uri);
      op.send(data)
        .end((err, res) => (err ? reject(handleXHRError(err, res))
          : resolve(handleResponse(res))));
    } else {
      Rest[type](uri, data)
        .end((err, res) => (err ? reject(handleXHRError(err, res))
          : resolve(handleResponse(res))));
    }
  });
};

