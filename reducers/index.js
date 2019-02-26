import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import JobsReducer from './JobsReducer';
import LikedJobsReducer from './LikedJobsReducer';

export default combineReducers({
  auth: AuthReducer,
  jobs: JobsReducer,
  likedJobs: LikedJobsReducer
});
