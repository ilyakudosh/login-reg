import { Router } from "express";
import AuthController from "../controllers/AuthController";
import Validate from "../middleware/Validate";
import Authorize from "../middleware/Authorize";
import authSchemas from "../schemas/auth";

const router = Router();

router.post(
  "/auth/signin",
  Validate.prepare(authSchemas.signin),
  AuthController.signin
);
router.post(
  "/auth/signup",
  Validate.prepare(authSchemas.signup),
  AuthController.signup
);
router.post(
  "/auth/refresh-tokens",
  Validate.prepare(authSchemas.refreshTokens),
  AuthController.refreshTokens
);
router.post("/auth/logout", Authorize.check, AuthController.logout);

export default router;
