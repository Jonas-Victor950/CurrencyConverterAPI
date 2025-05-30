import { Request, Response } from "express";
import { CreateTransactionSchema } from "../dto/createTransaction.dto";
import { TransactionService } from "../service/transaction.service";
import { ApiError } from "../../../utils/ApiError";

export async function convertCurrency(req: Request, res: Response) {
  const { fromCurrency, toCurrency, amount } = req.body;

  const parsed = CreateTransactionSchema.safeParse({
    fromCurrency,
    toCurrency,
    amount,
  });

  if (!parsed.success) {
    throw new ApiError(400, "Validation error");
  }

  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized user");
  }

  const result = await TransactionService.convertAndSave({
    ...parsed.data,
    userId,
  });

  res.status(201).json(result);
}

export async function listTransactions(req: Request, res: Response) {
  const userId = req.user?.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized user");
  }

  const transactions = await TransactionService.getUserTransactions(userId);
  res.json(transactions);
}
