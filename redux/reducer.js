import axios from 'axios';

// CONSTANTS
const GET_USERS = 'GET_USERS';

// INITIAL STATE
const initialState = {
  users: []
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
      console.log('payload', action.payload);
      console.log('Error - GET_USERS_REJECTED');
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
    payload: axios.get('http://localhost:3001/api/users')
  };
}