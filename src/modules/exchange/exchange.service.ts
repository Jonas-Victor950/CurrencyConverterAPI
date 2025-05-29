import axios from 'axios';
import { currencyApiConfig } from '../../config/currencyApi';

export class ExchangeService {
  static async getExchangeRate(from: string, to: string): Promise<number> {
    try {
      const response = await axios.get('https://api.currencyapi.com/v3/latest', {
        params: {
          apikey: currencyApiConfig.apiKey,
          base_currency: from,
          currencies: to,
        },
      });

      const rate = response.data?.data?.[to]?.value;

      if (!rate) {
        throw new Error(`No exchange rate found from ${from} to ${to}`);
      }

      return rate;
    } catch (error: any) {
      console.error('[CurrencyAPI Error]', error.response?.data || error.message);
      throw new Error('Failed to fetch exchange rate');
    }
  }
}
