import axios from "axios";

// CONSTANTS
const GET_USERS = "GET_USERS";

// INITIAL APP STATE
const initialState = {
  users: [],
  stats: []
};

// REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USERS}_FULFILLED`:
      console.log("payload", action.payload);
      return {
        ...state,
        users: action.payload
      };
    case `${GET_USERS}_REJECTED`:
      console.log("Error - GET_USERS_REJECTED");
      break;
    default:
      return state;
  }
}

// ACTION CREATORS
export function getUsers() {
  return {
    type: GET_USERS,
    payload: axios.get("http://localhost:3001/api/stats")
  };
}
