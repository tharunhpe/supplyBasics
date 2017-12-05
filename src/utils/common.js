import atob from 'atob';
import _ from 'lodash';

// Capitalizes first letter and also lowercases the others
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Compares strings taking into account numbers inside
export function naturalCompare(a, b) {
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

// Get query string value for specified key
export function getQueryStringValue(key) {
  return unescape(
    window.location.search.replace(
      new RegExp(`^(?:.*[&\\?]${escape(key).replace(/[\.\+\*]/g, '\\$&')}(?:\\=([^&]*))?)?.*$`, 'i'), '$1'));
}

export function recusivelyGetChildren({ list, childrenKey }) {
  let children = [];
  if (!list[childrenKey]) {
    return [];
  }
  for (let i = 0; i < list[childrenKey].length; i = i + 1) {
    children.push(list[childrenKey][i]);
    const results = getChildrenNodes(list[childrenKey][i], childrenKey);
    children = children.concat(results);
  }
  return children;
}

export function recursivelyGetParentsForNode({ node, parentKey }) {
  const parents = [];
  let parentNode = node[parentKey];

  while (parentNode) {
    parents.push(parentNode);
    parentNode = parentNode[parentKey];
  }
  return parents;
}

// Get an element by id from a tree
export function findRecursiveItemById({ list, childrenKey, id }) {
  let result;
  for (let i = 0; i < list.length; i = i + 1) {
    result = findNode(list[i], childrenKey, id);
    if (result) break;
  }

  return result;
}

// Recursive search in node
function findNode(currentNode, childrenKey, id) {
  let currentChild;
  let result;

  if (id === currentNode.id) {
    return currentNode;
  }

  if (!currentNode[childrenKey]) {
    return false;
  }

  // Use a for loop instead of forEach to avoid nested functions
  // Otherwise "return" will not work properly
  for (let i = 0; i < currentNode[childrenKey].length; i = i + 1) {
    currentChild = currentNode[childrenKey][i];
    currentChild.parent = _.omit(currentNode, [childrenKey]);
    // Search in the current child
    result = findNode(currentChild, childrenKey, id);

    // Return the result if the node has been found
    if (result !== false) {
      return result;
    }
  }

  // The node has not been found and we have no more options
  return false;
}

// Recursive search in node
function getChildrenNodes(currentNode, childrenKey, children = []) {
  let currentChild;
  // let results;

  if (!currentNode[childrenKey] || !currentNode[childrenKey].length) {
    return [];
  }

  // Use a for loop instead of forEach to avoid nested functions
  // Otherwise "return" will not work properly
  for (let i = 0; i < currentNode[childrenKey].length; i = i + 1) {
    currentChild = currentNode[childrenKey][i];
    children.push(currentChild);
    // Search in the current child
    const childernOfCurrentNode = getChildrenNodes(currentChild, childrenKey, children);
    if (childernOfCurrentNode) {
      children = children.concat(childernOfCurrentNode); // eslint-disable-line
    }
  }

  // The node has not been found and we have no more options
  return children;
}

// Removes the duplicate objects from an array based on a specific property
export function removeDuplicateItemsByProperty(value, property) {
  const noDuplicates = [];
  value.reduce((a, b) => {
    if (a[property] !== b[property]) noDuplicates.push(b);
    return b;
  }, []);
  return noDuplicates;
}

// Checks if an array contains other values than 'null'
export function otherThanNull(array) {
  return array.some((element) => element !== null);
}

export function getTypesValues(value) {
  const types = {
    py: 'Python',
  };
  if (!types[value]) {
    return value;
  }

  return types[value];
}

export function addEllipsis(stringToCut, visibleLenght) {
  let visibleString = stringToCut;
  if (stringToCut && stringToCut.length > visibleLenght) {
    const trimmedString = stringToCut.substring(0, visibleLenght);
    visibleString = trimmedString.indexOf(' ') !== -1 ? `${trimmedString
      .substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))}...`
      :
      `${trimmedString}...`;
  }
  return visibleString;
}

export function getItemsByType(items, type) {
  const specificItems = [];
  if (items) {
    items.forEach((item) => {
      if (item.type === type) {
        specificItems.push(item);
      }
    });
  }
  return specificItems;
}

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(atob(base64));
}

// generic method for handling pagination responses in the store
export function handleListResponse({
  res,
  err,
  oldQueryParams,
  currentQueryParams,
  oldItems,
  successAction,
  setQueryAction,
  failureAction,
  dispatch,
}, callback) {
  if (err) {
    dispatch(failureAction({ error: res ? res.body : err.body }));

    // Check if the results are the ones for the current query params
    // to make sure we always display the last results
  } else if (_.isEqual(oldQueryParams, currentQueryParams)) {
    const {
      start,
      total,
      members,
    } = res.body;

    const pagination = {
      start: start + currentQueryParams.pagination.count,
      count: currentQueryParams.pagination.count,
      total,
    };

    const nextQueryParams = {
      ..._.cloneDeep(currentQueryParams),
      pagination,
    };
    const nextItems = oldItems.concat(members);

    dispatch(setQueryAction(nextQueryParams));
    dispatch(successAction(nextItems));
    if (typeof callback === 'function') callback();
  }
}

// Make a new, simpler query generator
export function generateQueryString({ pagination, search, sort, filters }) {
  // Handle pagination
  let queryString = '';
  if (pagination) {
    const { start, count } = pagination;
    queryString = queryString.concat(`?start=${start}&count=${count}`);
  }

  // Handle search
  if (search) {
    const { searchBy, value: searchValue } = search;
    if (searchValue.length) {
      queryString = queryString.concat(`&filter=${searchBy}%20LIKE%20%27%25${searchValue}%25%27`);
    }
  }

  // Handle sort
  if (sort) {
    queryString = queryString.concat(`&sort=${sort.value}:${sort.direction}`);
  }

  // Handle filters
  if (filters) {
    const filterProps = Object.keys(filters);
    const queryOperatorArray = [];
    let queryOperatorString = '&query=';
    let filterOperatorString = '';

    if (filterProps.length) {
      // Make filters by property
      filterProps.forEach((prop) => {
        const filter = filters[prop];

        const {
          values,
          queryOperator = 'query',
          sqlOperator = 'EQ',
          extraFilters = [],
        } = filter;

        if (values.length) {
          // Some queries require extra default fitlers
          let extraFiltersString = '';
          if (extraFilters.length) {
            extraFiltersString = extraFiltersString.concat(extraFilters.map(
              ({ operator, field, fieldValues, sqlOperator: sqlOp }) =>
              fieldValues.map((val) =>
              `%3B%20${operator}%20${field}%20${sqlOp}%20%27${val}%27`,
            ).join('')));
          }

          if (queryOperator === 'query') {
            queryOperatorArray.push(
              values.map((value) =>
                `${prop}%20${sqlOperator}%20%27${value}%27`,
              )
              .join('%3B%20OR%20')
              .concat(extraFiltersString),
            );
          } else if (queryOperator === 'filter') {
            filterOperatorString = filterOperatorString.concat(
              values.map((value) =>
                `&${queryOperator}=${prop}%20${sqlOperator}%20%27${value}%27`,
              )
              .join('')
              .concat(extraFiltersString),
            );
          }
        }
      });

      if (queryOperatorArray.length) {
        queryOperatorString = queryOperatorString.concat(queryOperatorArray.join('%3B%20AND%20'));
        queryString = queryString.concat(queryOperatorString);
      }

      if (filterOperatorString !== '&') {
        queryString = queryString.concat(filterOperatorString);
      }
    }
  }

  return queryString;
}
