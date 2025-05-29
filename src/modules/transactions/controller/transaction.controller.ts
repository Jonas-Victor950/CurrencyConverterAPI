import { Request, Response } from "express";
import { CreateTransactionSchema } from "../dto/createTransaction.dto";
import { TransactionService } from "../service/transaction.service";

export async function convertCurrency(req: Request, res: Response) {
  try {
    const { fromCurrency, toCurrency, amount } = req.body;

    const parsed = CreateTransactionSchema.safeParse({
      fromCurrency,
      toCurrency,
      amount,
    });

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized user" });
      return;
    }

    const result = await TransactionService.convertAndSave({
      ...parsed.data,
      userId,
    });

    res.status(201).json(result);
    return;
  } catch (error: any) {
    console.error("[Convert Error]", error.message);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}
