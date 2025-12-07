import { Router } from "express";
import { loginHandler } from "../../controllers/authentication/authController";
import { validateLoginSchema } from "../../middleware/validation/validateLoginSchema";

const router = Router();

export default router.post("/", validateLoginSchema, loginHandler);
