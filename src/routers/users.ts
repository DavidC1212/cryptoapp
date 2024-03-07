import { Router } from "express";
import { addSymbol, dashboard, logout } from "../controllers/users/controller";
import { addSymbolValidator } from "../controllers/users/validate";
import validate from "../middlewares/input-validation";
import enforceAuth from "../middlewares/enforce-auth";

const router = Router();

router.use(enforceAuth);
router.get('/dashboard', dashboard)
router.post('/symbols/add', validate(addSymbolValidator), addSymbol)
router.get('/logout', logout)

export default router;