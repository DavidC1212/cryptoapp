import { Router } from "express";
import { addSymbol, dashboard } from "../controllers/users/controller";
import { addSymbolValidator } from "../controllers/users/validate";
import validate from "../middlewares/input-validation";

const router = Router();

router.get('/dashboard', dashboard)
router.post('/symbols/add', validate(addSymbolValidator), addSymbol)

export default router;