import axios from 'axios';
import { Platform } from 'react-native';

// CONSTANTS
const GET_USERS = 'GET_USERS';
const GET_STATS = 'GET_STATS';

// INITIAL STATE
const initialState = {
  users: [],
  stats: []
};

//REDUCER
export default function reducer(state = initialState, action)
{
  console.log('Entering reducer()', action.payload);
  switch(action.type)
  {
    case `${GET_USERS}_FULFILLED`:
      console.log('payload', action.payload.data);
      return {
        ...state,
        users: action.payload.data
      };
    case `${GET_USERS}_REJECTED`:
      console.log('Error - GET_USERS_REJECTED');
      break;
    case `${GET_STATS}_FULFILLED`:
      console.log('payload', action.payload.data);
      return {
        ...state,
        users: action.payload.data
      };
    case `${GET_STATS}_REJECTED`:
      console.log('Error - GET_STATS_REJECTED');
      break;
    default:
      return state;
  }
}

// ACTION CREATORS
export function getUsers(){ 
  console.log('action creator: getUsers');
  return {
    type: GET_USERS,
    payload: axios.get(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/users`)
  };
}

export function getStats(){ 
  console.log('action creator: getStats');
  return {
    type: GET_STATS,
    payload: axios.get(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/stats`)
  };
}