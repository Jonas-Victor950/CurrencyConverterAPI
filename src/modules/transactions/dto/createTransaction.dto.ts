import { z } from 'zod';

export const CreateTransactionSchema = z.object({
  fromCurrency: z.enum(['BRL', 'USD', 'EUR', 'JPY']),
  toCurrency: z.enum(['BRL', 'USD', 'EUR', 'JPY']),
  amount: z.number().positive()
});

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>;
