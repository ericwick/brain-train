import axios from 'axios';
import { Platform } from 'react-native';

// CONSTANTS
const GET_USERS = 'GET_USERS';
const GET_STATS = 'GET_STATS';
const ATTEMPT_LOGIN = 'ATTEMPT_LOGIN';
const GET_TRIVIA = 'GET_TRIVIA';

// INITIAL STATE
const initialState = {
  users: [],
  currentUser: -1,
  stats: [],
  trivia: []
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
    case `${GET_TRIVIA}_FULFILLED`:
      // console.log(action.payload.data);
      return {
        ...state,
        trivia: action.payload.data
      };
    case `${GET_TRIVIA}_REJECTED`:
      console.log('Error - GET_TRIVIA_REJECTED');
      break;
    case `${ATTEMPT_LOGIN}_FULFILLED`:
    if(!action.payload.data.length){
      return {
        ...state,
        currentUser: -1
      };
    } else {
      console.log('setting currentUser to', action.payload.data[0].uid);
      return {
          ...state,
          currentUser: action.payload.data[0].uid
        };
      }
    case `${ATTEMPT_LOGIN}_REJECTED`:
      console.log('Error - ATTEMPT_LOGIN_REJECTED');
      break;
    default:
      return state;
  }
}

// ACTION CREATORS
export function getUsers(){ 
  let point = `http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/users`;
  return {
    type: GET_USERS,
    payload: axios.get(point)
  };
}

export function getStats(){
  let point = `http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/stats`;
  return {
    type: GET_STATS,
    payload: axios.get(point)
  };
}

export function attemptLogin(credentials){
  let point = `http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/login`;
  return {
    type: ATTEMPT_LOGIN,
    payload: axios.post(point, credentials)
  };
}

export function getTrivia(category, num, difficulty){
  let point = `http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/trivia?category=${category}&num=${num}&difficulty=${difficulty}`;
  return {
    type: GET_TRIVIA,
    payload: axios.get(point)
  };
}