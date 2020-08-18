import { UsersContainer } from "./Users";

export const routes = [
  {
    path: "/users",
    component: UsersContainer,
    isAuth: true,
    exact: true
  }
];
