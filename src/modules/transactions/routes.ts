import { Router } from "express";
import { convertCurrency } from "./controller/transaction.controller";

const router = Router();

router.post("/convert", convertCurrency);

export default router;
