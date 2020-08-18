import { combineReducers } from "redux";

import { signinReducer as signin } from "./Signin";
import { signupReducer as signup } from "./Signup";

export const reducers = combineReducers({
  signin,
  signup
});
