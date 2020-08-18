import { authRoutes } from "./feature/Auth";
import { notFoundRoute } from "./feature/NotFound";
import { cabinetRoutes } from "./feature/Cabinet";
import { blockedRoute } from "./feature/Blocked";

export const routes = [
  ...authRoutes,
  ...cabinetRoutes,
  blockedRoute,
  notFoundRoute
];
