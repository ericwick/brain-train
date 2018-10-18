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
  switch(action.type)
  {
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        users: action.payload.data
      };
    case `${GET_USERS}_REJECTED`:
      console.log('Error - GET_USERS_REJECTED');
      break;
    case `${GET_STATS}_FULFILLED`:
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
  let point = `http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/users`;
  console.log('point', point);
  return {
    type: GET_USERS,
    payload: axios.get(point)
  };
}

export function getStats(){
  let point = `http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/stats`;
  console.log('point', point);
  return {
    type: GET_STATS,
    payload: axios.get(point)
  };
}