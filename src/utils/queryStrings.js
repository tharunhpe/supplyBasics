import _ from 'lodash';
import {
  PARAM_TYPES,
  FILTER_OPERATORS,
  FILTER_SQL_OPERATORS,
} from './constants';

/*
 * Generates a query string for the server (e.g "sort=policy.name:asc&query=(resource.id EQ 1234)" )
 * Sample data to send
 *
 * requestParams: {
 *  start: 0,
 *  count: 10,
 *  query: {
 *    deployment: { id: '123' },
 *    resource: { id: '423' },
 *  },
 *  filter: {
 *    name: {
 *      value: 'something',
 *      operator: {one of FILTER_OPERATORS}, // optional
 *    },
 *  },
 *  sort: {
 *    prop: {
 *      name: 'policy',
 *      type: 'object',
 *      GroupBy: 'name',
 *    },
 *    direction: 'asc',
 *  },
 *},
 *
 *
 */
export function generateQueryString({
  view = '',
  start = 0,
  count = 10,
  query = {},
  sort = {},
  filter = {},
  level = '',
}, statusMap, complianceStatusMap, sourceMap, vulnerabilityStatusMap) {
  let queryString = '?';
  let sortParam = '';
  let queryParam = '';
  let searchParam = '';

  if (Object.keys(sort).length) {
    sortParam = mapSortAttr(sort);
  }

  if (Object.keys(query).length) {
    queryParam = mapQueryAttr(
      query, statusMap, complianceStatusMap, sourceMap, vulnerabilityStatusMap);
  }

  if (Object.keys(filter).length) {
    searchParam = mapFilterAttr(filter);
  }

  queryString = queryString.concat(`start=${start}`);
  queryString = queryString.concat(`&count=${count}`);
  queryString = queryString.concat(view.length ? `&view=${view}` : '');
  queryString = queryString.concat(sortParam.length && sortParam.indexOf('none') === -1 ? `&${sortParam}` : '');
  queryString = queryString.concat(queryParam.length ? `&${queryParam}` : '');
  queryString = queryString.concat(searchParam.length ? `${searchParam}` : '');
  queryString = level ? queryString.concat(`&level=${level}`) : queryString;

  return queryString;
}
export function mapFilterAttr(filter) {
  const keys = Object.keys(filter);
  let filterString = '';
  let filterParams = [];

  if (keys.length) {
    filterParams = keys.map((key) => {
      let value = filter[key].value;
      const operator = filter[key].operator;
      const sqlOperator = filter[key].sqlOperator;

      // %25 evaluates to '%' on the server and is used to make different types of filtering
      if (value.length) {
        if (!sqlOperator) {
          switch (operator) {
            case FILTER_OPERATORS.STARTS:
              value = `${value}%25`; // 'test%' - return all values starting with test
              break;
            case FILTER_OPERATORS.ENDS:
              value = `%25${value}`; // '%test' - return all values ending with test
              break;
            case FILTER_OPERATORS.CONTAINS:
              value = `%25${value}%25`; // '%test%' - return all values containing test
              break;
            case FILTER_OPERATORS.IN:
              value = `${value}`; // '%test%' - return all values containing test
              break;
            default:
              value = `%25${value}%25`; // '%test%' - return all values containing test
          }
        } else if (sqlOperator.length) {
          if (sqlOperator === FILTER_SQL_OPERATORS.IN) {
            return `&filter=${key} IN '${value}'`;
          } else if (sqlOperator === FILTER_SQL_OPERATORS.EQ) {
            return `&filter=${key} EQ '${value}'`;
          }
        }
        return `&filter=${key} LIKE '${value}'`;
      }
      return '';
    });
  }

  filterParams = filterParams.filter((sParam) => !!sParam.length);

  if (filterParams.length) {
    filterString = filterString.concat(filterParams.join(''));
  }

  return filterString;
}


// Private functions used inside this file

// Generates query string from 'query' property
function mapQueryAttr(query, statusMap, complianceStatusMap, sourceMap, vulnerabilityStatusMap) {
  const keys = Object.keys(query);
  let queryString = '';
  let queryParams = [];

  if (keys.length) {
    queryParams = keys.map((key) => {
      const qParam = query[key];
      const type = Array.isArray(qParam) ? 'array' : typeof qParam;

      if (qParam && type === 'object') {
        // There is a defect in templates list api where filter like is not supported for this PI
        // name check is added temporarily for search of templates to workaround the defect.

        // TODO: Change this
        if (key === 'name' || key === 'tagname' || key === 'parent') {
          return `${key} LIKE '%25${qParam.value}%25'`;
        }
        const props = Object.keys(qParam);
        const resultsArr = props.map((prop) => qParam[prop] && `${key}.${prop} EQ '${qParam[prop]}'`);
        return resultsArr.filter((res) => res).join(' AND ');
      } else if (qParam && type === 'array') { // If it is an array, an array of strings is expected
        let keyValue = [];
        if (key === 'status') {
          // Grommet statuses are different from our statuses so we need to map them to the
          // statuses we need in our API
          keyValue = qParam.map((value) => {
            const statusValue = _.findKey(statusMap, (obj) => obj === value);
            return `${key} EQ '${statusValue}'`;
          });
        } else if (key === 'complianceStatus') {
          // Grommet statuses are different from our statuses so we need to map them to the
          // statuses we need in our API
          keyValue = qParam.map((value) => {
            const statusValue = _.findKey(complianceStatusMap, (obj) => obj === value);

            return `${key} EQ '${statusValue}'`;
          });
        } else if (key === 'vulnerabilityStatus') {
          // Grommet statuses are different from our statuses so we need to map them to the
          // statuses we need in our API
          keyValue = qParam.map((value) => {
            const statusValue = _.findKey(vulnerabilityStatusMap, (obj) => obj === value);

            return `${key} EQ '${statusValue}'`;
          });
        } else {
          keyValue = qParam.map((value) => `${key} EQ '${value}'`);
        }
        return keyValue.join('%3B OR '); // using encoded form of ;(semicolon) as it was being sent unencoded
      } else if (qParam) {
        return `${key} EQ '${qParam}'`;
      }
      return '';
    });

    queryParams = queryParams.filter((qParam) => !!qParam.length);

    if (queryParams.length) {
      queryString = queryString.concat('query=');
      queryString = queryString.concat(queryParams.join('%3B AND '));
    }
  }

  return queryString;
}

function mapSortAttr({ prop, direction }) {
  if (prop.type === PARAM_TYPES.OBJECT) {
    return `sort=${prop.name}.${prop.groupBy}:${direction}`;
  } else if (prop.type === PARAM_TYPES.TIMESTAMP) {
    // The server returns the smallest unix timestamp first if asc, which is older
    // Because we show last 7 days, last 30 days, we expect to get 7 before 30
    const reverseDirection = direction === 'asc' ? 'desc' : 'asc';
    return `sort=${prop.name}:${reverseDirection}`;
  }
  return `sort=${prop.name}:${direction}`;
}

export function generateTagQueryString({
  start = 0,
  count = 10,
  query = {},
}, statusMap) {
  let queryString = '?';
  let queryParam = '';

  if (Object.keys(query).length) {
    queryParam = mapQueryAttr(query, statusMap);
  }

  queryString = queryString.concat(`start=${start}`);
  queryString = queryString.concat(`&count=${count}`);
  queryString = queryString.concat(queryParam.length ? `&${queryParam}` : '');

  return queryString;
}
