import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import { createCustomFetch, makeFetchMethods, HttpError } from '../shared/fetch/customFetch';

// Define types for Bithumb API response
type CandlestickData = [
  string, // timestamp
  string, // opening price
  string, // closing price
  string, // high price
  string, // low price
  string  // volume
];

interface BithumbApiResponse {
  status: string;
  data: CandlestickData[];
  message?: string; // For error messages
}

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

        let interval = '24h'; // Default interval
        switch (selectedTimeRange) {
          case '1분':
            interval = '1m';
            break;
          case '1시간':
            interval = '1h';
            break;
          case '1주':
            interval = '1w';
            break;
          case '1달':
            interval = '1M'; // Bithumb uses '1M' for 1 month
            break;
          case '1년':
            interval = '1y'; // Bithumb uses '1y' for 1 year
            break;
          default:
            interval = '24h'; // Fallback
        }
        console.log(`Fetching data for ${selectedCoin} with interval: ${interval}`);
        const data = await bithumbApi.get(`/public/candlestick/${selectedCoin}_KRW/${interval}`);
        if (data.status === '0000') {
          setBitcoinData(data.data);
          console.log('Fetched Bitcoin Data:', data.data);
        } else {
          setError(data.message || 'Failed to fetch data');
          console.error('Bithumb API Error:', data.message);
        }
      } catch (err: unknown) {
        console.error('Error fetching Bitcoin data:', err);
        if (err instanceof HttpError) {
          setError(err.message);
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
                  data: bitcoinData.map((d: CandlestickData) => parseFloat(d[2])),
                  label: selectedCoin,
                },
              ]}
              xAxis={[{
                scaleType: 'point',
                data: bitcoinData.map((d: CandlestickData) => new Date(parseInt(d[0])).toISOString()),
              }]}
              height={300}
              margin={{ top: 10, bottom: 20, left: 30, right: 10 }}
            />
          </div>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
            Data points: {bitcoinData.length}
          </p>
          {/* Display some raw data for verification */}
          <pre style={{ fontSize: '12px', backgroundColor: '#eee', padding: '10px', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto' }}>
            {JSON.stringify(bitcoinData.slice(0, 5), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Chart1;
