import {
  FILTER_SQL_OPERATORS,
} from 'utils/constants';

export const DEFAULT_ITEMS_PER_PAGE = 6;
export const DEFAULT_QUERY = {
  start: 0,
  count: DEFAULT_ITEMS_PER_PAGE,
  total: 30,
  // Important: default search field should be set as the first field from
  // FIELDS_TO_DISPLAY which has query === true
  // If the query is an object (as demonstrated in Jobs constants), you will need to
  // set up the default query search field for that query filter
  search: {
    value: '',
    searchBy: 'name',
    queryOperator: 'query',
  },
  // Important: filters should match FILTERS_TO_DISPLAY because the list wrapper will attempt
  // to write in the properties of each filter.
  // Also these are used to generate the default values of the filters.
  filters: {
    category: {
      values: [],
      sqlOperator: FILTER_SQL_OPERATORS.EQ,
    },
    brand: {
      values: [],
      sqlOperator: FILTER_SQL_OPERATORS.EQ,
    },
  },
};

