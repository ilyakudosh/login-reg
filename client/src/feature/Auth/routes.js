import { SigninContainer } from "./Signin";
import { SignupContainer } from "./Signup";

export const routes = [
  {
    path: "/",
    component: SigninContainer,
    isAuth: false,
    exact: true
  },
  {
    path: "/signup",
    component: SignupContainer,
    isAuth: false,
    exact: true
  }
];
