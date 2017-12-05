# services

> These act as interfaces for our application.

### Api

> This is utilizing [Grommet's Rest]

TODO:
- migrate to fetch() and promises
Grommet provides some helpers for this:
 -headers
 -buildParams
 -buildQuery
 -processStatus

Usage example:
getData (filters) {
  const query = buildQuery(filters);
  const options = { method: 'GET', headers: { ...headers, Auth: _token };
  fetch(`/rest/index/resources${query}`, options)
  .then(processStatus)
  .then((response) => response.json())
  .then((result) => dispatch(someAction))
  .catch((error) => dispatch(errorAction));
}
