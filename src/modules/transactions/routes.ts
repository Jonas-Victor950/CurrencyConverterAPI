import { Router } from "express";
import {
  convertCurrency,
  listTransactions,
} from "./controller/transaction.controller";

const router = Router();

router.post("/convert", convertCurrency);
router.get("/transactions", listTransactions);

export default router;
