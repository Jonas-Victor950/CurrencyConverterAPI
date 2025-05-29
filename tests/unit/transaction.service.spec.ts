import { TransactionService } from '../../src/modules/transactions/service/transaction.service';
import { prisma } from '../../src/database/client';
import { ExchangeService } from '../../src/modules/exchange/exchange.service';

jest.mock('../../src/database/client', () => ({
  prisma: {
    transaction: {
      create: jest.fn()
    }
  }
}));

jest.mock('../../src/modules/exchange/exchange.service');

describe('TransactionService', () => {
  it('should convert and save transaction', async () => {
    (ExchangeService.getExchangeRate as jest.Mock).mockResolvedValue(5);
    (prisma.transaction.create as jest.Mock).mockResolvedValue({
      id: 1,
      userId: 123,
      fromCurrency: 'USD',
      toCurrency: 'BRL',
      fromValue: 100,
      toValue: 500,
      rate: 5,
      timestamp: new Date()
    });

    const result = await TransactionService.convertAndSave({
      userId: 123,
      fromCurrency: 'USD',
      toCurrency: 'BRL',
      amount: 100
    });

    expect(result).toHaveProperty('transactionId', 1);
    expect(result.toValue).toBe(500);
  });
});
