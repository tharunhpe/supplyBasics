import { capitalizeFirstLetter } from './common';

export function generateAttributes(SORT_PARAMS, FILTER_PARAMS, statusMap, statusDisplayMap) {
  let attrs = [];
  if (SORT_PARAMS.sort) {
    attrs = attrs.concat(generateSortAttributes(SORT_PARAMS.sort));
  }

  if (FILTER_PARAMS.status) {
    attrs = attrs.concat(generateFilterAttributes(statusMap, statusDisplayMap));
  }

  if (FILTER_PARAMS.other) {
    attrs = attrs.concat(generateOtherFilterAttributes(FILTER_PARAMS.other));
  }

  return attrs;
}

export function generateSortAttributes(sort) {
  let formattedSortAttributes = [];
  const sortAttrModel = {
    label: '', // Will be displayed in filters
    value: '',
    direction: 'asc',
    name: '', // Attribute by which the soring will be done
    sort: {
      direction: 'asc', // Default sort direction
    },
  };

  formattedSortAttributes = sort.map(({ name, display }) => {
    const param = Object.assign({}, sortAttrModel);
    param.label = display || capitalizeFirstLetter(name);
    param.name = name;
    param.value = name;
    param.direction = 'asc';
    return param;
  });

  return formattedSortAttributes;
}

// Add statuses here
function generateFilterAttributes(statusMap, statusDisplayMap) {
  const statusKeys = Object.keys(statusMap);
  const filterAttrModel = {
    label: 'Status',
    name: 'status',
    status: true,
    filter: {
      all: true,
      values: [],
    },
  };

  const values = statusKeys.map((key) => ({
    label: statusDisplayMap[key],
    value: statusMap[key],
  }));

  filterAttrModel.filter.values = values;
  return filterAttrModel;
}

// Add other filters here
function generateOtherFilterAttributes(other) {
  const filterAttrModel = {
    other: {
      label: other.label,
      name: other.name,
      all: true,
      values: other.values,
    },
  };

  return filterAttrModel;
}
