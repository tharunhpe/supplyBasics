import { getApp } from 'services/Api';

import { generateQueryString } from 'utils/queryStrings';
import { RESULT_STATUSES_MAP } from 'utils/constants';
import { createAction, createReducer } from 'utils/redux-utils';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_QUERY } from './constants';

// --------- ACTION TYPES ----------
export const FETCH_ITEMS_SUCCESS = 'app/FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'app/FETCH_ITEMS_FAILURE';
export const SET_QUERY_PARAMS = 'app/SET_QUERY_PARAMS';
export const LIST_BEING_FETCHED = 'app/LIST_BEING_FETCHED';

// --------- ACTION CREATORS ----------
const fetchItemsSuccess = (payload) => createAction(FETCH_ITEMS_SUCCESS, payload);
const fetchItemsFailure = (payload) => createAction(FETCH_ITEMS_FAILURE, payload);
const setQuery = (payload) => createAction(SET_QUERY_PARAMS, payload);
const getAppStart = () => createAction(
  LIST_BEING_FETCHED, { listBeingFetched: true },
);
const getAppEnd = () => createAction(
  LIST_BEING_FETCHED, { listBeingFetched: false },
);

export function loadApp() {
  return (dispatch, getState) => {
    const requestParams = generateQueryString(getState().app.requestParams,
      RESULT_STATUSES_MAP);
    return getApp(
      requestParams,
      getState().app.requestParams,
      (res, err) => {
        if (err) {
          dispatch(fetchItemsFailure({ error: res ? res.body : err.body }));
        } else {
          // Check if the results are the ones for the current query params
          // to make sure we always display the last results
          const currentRequestParams = generateQueryString(
            getState().app.requestParams,
            RESULT_STATUSES_MAP,
          );

          if (requestParams === currentRequestParams) {
            dispatch(fetchItemsSuccess({ app: res.body }));
          }
        }
      },
    );
  };
}

export function loadNextApp(params) {
  return (dispatch, getState) => {
    if (!getState().app.listBeingFetched) {
      dispatch(setQuery({ requestParams: params }));
      dispatch(getAppStart());
      const requestParams = generateQueryString(getState().app.requestParams,
        RESULT_STATUSES_MAP);
      return getApp(
        requestParams,
        getState().app.requestParams,
        (res, err) => {
          dispatch(getAppEnd());
          if (err) {
            dispatch(fetchItemsFailure({ error: res ? res.body : err.body }));
          } else {
            const oldList = getState().app.app.members;
            const newResults = res.body;
            const newList = oldList.concat(newResults.members);
            newResults.members = newList;

            dispatch(fetchItemsSuccess({ app: newResults }));
          }
        },
      );
    }
    return null;
  };
}

export function setQueryParams(requestParams) {
  return setQuery({ requestParams });
}

// ------- REDUCER --------
export const initialState = {
  requestParams: JSON.parse(JSON.stringify(DEFAULT_QUERY)),
  listBeingFetched: false,
  app: {
    start: 0,
    count: DEFAULT_ITEMS_PER_PAGE,
    total: 10,
    members: [],
  },
};

const handlers = {
  [FETCH_ITEMS_SUCCESS]: (state, { payload }) =>
    ({ ...state,
      app: payload.app }),
  [FETCH_ITEMS_FAILURE]: (state, { payload }) =>
    ({ ...state, errors: [...state.errors, payload.error], error: payload.error }),
  [SET_QUERY_PARAMS]: (state, { payload }) =>
    ({ ...state, requestParams: payload.requestParams }),
  [LIST_BEING_FETCHED]: (state, { payload }) =>
    ({ ...state, listBeingFetched: payload.listBeingFetched }),
};

export default createReducer(initialState, handlers);
