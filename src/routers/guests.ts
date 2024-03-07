import { Router } from "express";
import { welcome } from "../controllers/guests/controller";
import enforceGuest from "../middlewares/enforce-guest";

const router = Router();

router.get('/', enforceGuest, welcome);

export default router;