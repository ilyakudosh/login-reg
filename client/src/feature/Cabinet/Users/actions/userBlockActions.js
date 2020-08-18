import { api } from "../../../../helpers/api";

export const USERS_UPDATE_PROCESS = "USERS_UPDATE_PROCESS";
export const USERS_UPDATE_ERROR = "USERS_UPDATE_ERROR";
export const USERS_UPDATE_SUCCESS = "USERS_UPDATE_SUCCESS";

export const usersUpdateProcess = () => ({
  type: USERS_UPDATE_PROCESS
});

export const usersUpdateSuccess = data => ({
  type: USERS_UPDATE_SUCCESS,
  data
});

export const usersUpdateError = error => ({
  type: USERS_UPDATE_ERROR,
  error
});

export const usersDeleteRequest = users => async dispatch => {
  try {
    dispatch(usersUpdateProcess());

    const data = await api("post", "users/delete", { users });

    dispatch(usersUpdateSuccess(data));
  } catch (error) {
    dispatch(usersUpdateError(error.response ? error.response.data : error));
  }
};

export const usersUpdateStatusRequest = (users, status) => async dispatch => {
  try {
    dispatch(usersUpdateProcess());

    const data = await api("post", "users/update-status", { users, status });

    dispatch(usersUpdateSuccess(data));
  } catch (error) {
    dispatch(usersUpdateError(error.response ? error.response.data : error));
  }
};
