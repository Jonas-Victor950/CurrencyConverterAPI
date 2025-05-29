import { CreateTransactionDTO } from "../dto/createTransaction.dto";
import { prisma } from "../../../database/client";
import { ExchangeService } from "../../exchange/exchange.service";

interface CreateTransactionWithUser extends CreateTransactionDTO {
  userId: number;
}

export class TransactionService {
  static async convertAndSave(data: CreateTransactionWithUser) {
    const { userId, fromCurrency, toCurrency, amount } = data;

    const rate = await ExchangeService.getExchangeRate(
      fromCurrency,
      toCurrency
    );
    const converted = amount * rate;

    const saved = await prisma.transaction.create({
      data: {
        userId,
        fromCurrency,
        toCurrency,
        fromValue: amount,
        toValue: converted,
        rate,
      },
    });

    return {
      transactionId: saved.id,
      userId: saved.userId,
      fromCurrency: saved.fromCurrency,
      toCurrency: saved.toCurrency,
      fromValue: saved.fromValue,
      toValue: saved.toValue,
      rate: saved.rate,
      timestamp: saved.timestamp.toISOString(),
    };
  }
}
