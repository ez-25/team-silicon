import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import { createCustomFetch, makeFetchMethods, HttpError } from '../shared/fetch/customFetch';

// Define types for Bithumb API response
type CandlestickData = {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number; // This is the closing price for the period
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  prev_closing_price: number;
  change_price: number;
  change_rate: number;
};

interface BithumbApiResponse extends Array<CandlestickData> {} // API now returns an array directly

// Extend the return type of makeFetchMethods to include the 'get' method
interface CustomFetchMethods {
  get: (endpoint: string, fetchOptions?: RequestInit) => Promise<BithumbApiResponse>;
  post: (endpoint: string, fetchOptions?: RequestInit) => Promise<any>;
  put: (endpoint: string, fetchOptions?: RequestInit) => Promise<any>;
  deleteFetch: (endpoint: string, fetchOptions?: RequestInit) => Promise<any>;
  patch: (endpoint: string, fetchOptions?: RequestInit) => Promise<any>;
}

const bithumbApi = makeFetchMethods(createCustomFetch({ baseUrl: 'https://api.bithumb.com' })) as CustomFetchMethods;

interface Chart1Props {
  selectedCoin: string;
  selectedTimeRange: string;
  onTimeRangeSelect: (range: string) => void;
  onCoinSelect: (coin: string) => void;
}

const Chart1 = ({ selectedCoin, selectedTimeRange, onTimeRangeSelect }: Chart1Props) => {
  const [bitcoinData, setBitcoinData] = useState<CandlestickData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        setLoading(true);
        setError(null);

        let endpoint = '';
        let unit = '';
        let count = 0;
        switch (selectedTimeRange) {
          case '1m':
            unit = '1';
            count = 30;
            endpoint = `/v1/candles/minutes/${unit}?market=${selectedCoin}&count=${count}`;
            break;
          case '1h':
            unit = '60';
            count = 10;
            endpoint = `/v1/candles/minutes/${unit}?market=${selectedCoin}&count=${count}`;
            break;
          case '1w':
            endpoint = `/v1/candles/days?count=7&market=${selectedCoin}`; // 7 days for 1 week
            break;
          case '1M':
            endpoint = `/v1/candles/days?count=30&market=${selectedCoin}`; // 30 days for 1 month
            break;
          case '1y':
            endpoint = `/v1/candles/days?count=365&market=${selectedCoin}`; // 365 days for 1 year
            break;
          case '24h': // Default or daily intervals
          default:
            endpoint = `/v1/candles/days?count=24&market=${selectedCoin}`; // Default to 24 days for 24h range if not minute
            break;
        }
        console.log(`Fetching data for ${selectedCoin} from endpoint: ${endpoint}`);
        const data = await bithumbApi.get(endpoint);
        // The API now returns an array directly, not an object with status and data.
        // We assume a successful fetch if 'data' is an array.
        if (Array.isArray(data)) {
          setBitcoinData(data);
          console.log('Fetched Bitcoin Data:', data);
        } else {
          // If it's not an array, it might be an error object from the API, or unexpected format.
          // Bithumb API returns status '0000' for success, but for these endpoints, it's direct array.
          // If it's an error, it might be a different structure.
          setError('Failed to fetch data: Unexpected API response format.');
          console.error('Bithumb API Error: Unexpected response format.', data);
        }
      } catch (err: unknown) {
        console.error('Error fetching Bitcoin data:', err);
        if (err instanceof HttpError) {
          setError(`Error: ${err.status} ${err.statusText} - ${err.message}`);
          console.error('HttpError details:', err);
        } else {
          setError((err as Error).message || 'An unexpected error occurred');
        }
        console.error('Caught error during fetch:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCoin) {
      fetchBitcoinData();
    }
  }, [selectedCoin, selectedTimeRange]);

  return (
    <div>
      {loading && <p>Loading {selectedCoin} data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {bitcoinData && bitcoinData.length > 0 && !loading && !error && (
        <div>
          <h3 style={{ marginBottom: '10px' }}>{selectedCoin} Chart ({selectedTimeRange})</h3>
          <div style={{ width: '100%', height: 300 }}>
            <LineChart
              series={[
                {
                  data: bitcoinData.map((d: CandlestickData) => d.trade_price),
                  label: selectedCoin,
                  showMark: false,
                },
              ]}
              xAxis={[{
                scaleType: 'point',
                data: [...bitcoinData].reverse().map((d: CandlestickData) => {
                  const date = new Date(d.timestamp);
                  if (selectedTimeRange === '1m' || selectedTimeRange === '1h') {
                    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
                  } else {
                    return date.toLocaleDateString('ko-KR');
                  }
                }),
              }]}
              height={300}
              margin={{ top: 10, bottom: 20, left: 30, right: 10 }}
            />
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Chart1;
