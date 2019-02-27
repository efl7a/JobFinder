import axios from 'axios';
import qs from 'qs';
import Config from 'react-native-config';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv'

import {
  FETCH_JOBS,
  LIKE_JOB,
  RESET_JOBS
} from './types';

const JOBS_URL = 'https://jobs.github.com/positions.json?'
const JOB_QUERY_PARAMS = {
  description: 'javascript'
};
const GOOGLE_URL = `https://maps.googleapis.com/maps/api/geocode/json?`
const GOOGLE_QUERY_PARAMS = {
  key: GOOGLE_MAPS_API_KEY
};

let COUNT = 0;

const buildJobsUrl = (region) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, lat: region.latitude, long: region.longitude })
  return `${JOBS_URL}${query}`
}

export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    const url = buildJobsUrl(region);
    let { data } = await axios.get(url);
    Promise.all(getGeoLocations(data)).then((jobsWithGeoLocation) =>{
      dispatch({ type: FETCH_JOBS, payload: jobsWithGeoLocation });
      callback();
    });
  } catch(e) {
    console.log(e);
  }
};

const getGeoLocations = (jobs) => {
   return (
     jobs.map(async (job) => {
      const url = buildLocationUrl(job.location)
      const { data } = await axios.get(url)
      const geoLocation = data.results[0].geometry.location
      return { ...job, latitude: geoLocation.lat, longitude: geoLocation.lng };
    })
  );
};

const buildLocationUrl = (cityName) => {
  const city = cityName.replace(' ', '+');
  const query = qs.stringify({ ...GOOGLE_QUERY_PARAMS, address: city })
  return `${GOOGLE_URL}${query}`
};

export const likeJob = (job) => {
  return ( { type: LIKE_JOB, payload: job } );
};

export const resetJobs = () => {
  return { type: RESET_JOBS }
}
