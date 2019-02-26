import _ from 'lodash';

import {
  LIKE_JOB,
  RESET_JOBS
 } from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIKE_JOB:
      return (_.uniqBy([ action.payload, ...state ], 'id'));
    case RESET_JOBS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
