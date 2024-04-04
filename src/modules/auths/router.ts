import auth from "../../middleware/auth";
import { register, login, verify } from "./controller";
import { valRegister, valLogin } from "./validation";

const router = require("express").Router();

router.post("/register", valRegister, register);
router.post("/login", valLogin, login);
router.get("/verify", auth, verify);

export default router;
