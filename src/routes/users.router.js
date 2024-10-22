import { Router } from "express";
import { UserControllers } from "../controllers/users.controller.js";

const usersController = new UserControllers();
const router = Router();

router.get("/", usersController.getAllUsers);
router.get("/mock", usersController.createUserMock);

router.post("/", usersController.create);

router.get("/:uid", usersController.getUser);
router.put("/:uid", usersController.updateUser);
router.delete("/:uid", usersController.deleteUser);
router.delete("/clearUsers/delete", usersController.deleteAllUser);

export default router;
