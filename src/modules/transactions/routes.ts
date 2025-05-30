import { Router } from "express";
import {
  convertCurrency,
  listTransactions,
} from "./controller/transaction.controller";

const router = Router();

/**
 * @openapi
 * /convert:
 *   post:
 *     summary: Convert currency and save transaction
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fromCurrency:
 *                 type: string
 *                 example: USD
 *               toCurrency:
 *                 type: string
 *                 example: BRL
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Transaction saved
 *       400:
 *         description: Validation error
 */
router.post("/convert", convertCurrency);

/**
 * @openapi
 * /transactions:
 *   get:
 *     summary: List transactions from logged user
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/transactions", listTransactions);

export default router;
