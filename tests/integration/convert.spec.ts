import request from 'supertest';
import app from '../../src/app';

describe('POST /api/convert', () => {
  it('should return 201 and transaction', async () => {
    const response = await request(app)
      .post('/api/convert')
      .send({
        fromCurrency: 'USD',
        toCurrency: 'BRL',
        amount: 50
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('transactionId');
  });
});
