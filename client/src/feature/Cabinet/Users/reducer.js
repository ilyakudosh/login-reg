import {
  USERS_REQUEST_PROCESS,
  USERS_REQUEST_ERROR,
  USERS_REQUEST_SUCCESS,
  USERS_UPDATE_SUCCESS,
  USERS_UPDATE_ERROR,
  USERS_UPDATE_PROCESS
} from "./actions";

import dateFormat from "dateformat";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: ""
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUEST_PROCESS:
      return { ...state, isError: false, errorMessage: "", isLoading: true };
    case USERS_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.error.message
      };
    case USERS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data.map(user => ({
          ...user,
          lastLoginDate: dateFormat(user.lastLoginDate, "yyyy.mm.dd hh:MM:ss "),
          creationDate: dateFormat(user.creationDate, "yyyy.mm.dd hh:MM:ss ")
        })),
        isLoading: false
      };
    case USERS_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.data.map(user => ({
          ...user,
          lastLoginDate: dateFormat(user.lastLoginDate, "yyyy.mm.dd hh:MM:ss "),
          creationDate: dateFormat(user.creationDate, "yyyy.mm.dd hh:MM:ss ")
        })),
        isLoading: false
      };
    case USERS_UPDATE_PROCESS:
      return { ...state, isError: false, errorMessage: "" };
    case USERS_UPDATE_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.error.message
      };
    default:
      return state;
  }
};
