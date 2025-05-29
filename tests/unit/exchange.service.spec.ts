import { ExchangeService } from '../../src/modules/exchange/exchange.service';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ExchangeService', () => {
  it('should return a number as exchange rate', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        data: {
          BRL: { value: 5.2532 }
        }
      }
    });

    const rate = await ExchangeService.getExchangeRate('USD', 'BRL');
    expect(rate).toBe(5.2532);
  });
});