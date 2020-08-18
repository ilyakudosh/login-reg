import { Router } from "express";
import UsersController from "../controllers/UsersController";
import Authorize from "../middleware/Authorize";

const router = Router();

router.get("/users", Authorize.check, UsersController.index);

router.post("/users/delete", Authorize.check, UsersController.delete);

router.post("/users/update-status", Authorize.check, UsersController.updateStatus);

export default router;
