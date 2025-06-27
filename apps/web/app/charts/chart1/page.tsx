'use client';

import React, { useEffect, useState } from 'react';
import { createCustomFetch, makeFetchMethods, HttpError } from '../../../shared/fetch/customFetch';
import { LineChart } from '@mui/x-charts';
import ClientSideOnly from '../../../components/ClientSideOnly';
import { TimeRangeSelector } from '../../../components/TimeRangeSelector';

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

const Chart1Page = () => {
  const [bitcoinData, setBitcoinData] = useState<CandlestickData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC'); // Default to BTC
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('24h'); // Default to 24h

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
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
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

  const handleCoinSelect = (coin: string) => {
    setSelectedCoin(coin);
  };

  const handleTimeRangeSelect = (range: string) => {
    console.log('Time range selected:', range);
    setSelectedTimeRange(range);
  };

  return (
    <ClientSideOnly>
      <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0' }}>
        {/* Sidebar */}
        <div style={{ width: '200px', backgroundColor: '#ffffff', padding: '20px', borderRight: '1px solid #e0e0e0' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Coins</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['BTC', 'DOGE', 'XRP', 'MyCoin'].map((coin) => (
              <li key={coin} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => handleCoinSelect(coin)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                    fontWeight: selectedCoin === coin ? 'bold' : 'normal',
                    color: selectedCoin === coin ? '#007bff' : '#333',
                  }}
                >
                  {coin}
                </button>
                <button style={{ background: 'none', border: '1px solid #ccc', borderRadius: '4px', padding: '2px 6px', cursor: 'pointer' }}>
                  +
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #ccc' }}></div>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #ccc' }}></div>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #ccc' }}></div>
          </div>
        </div>

        {/* Main Chart Area */}
        <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#ffffff', margin: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontSize: '30px' }}>₿</span> {selectedCoin}
          </h1>
          <ClientSideOnly>
            <TimeRangeSelector onSelect={handleTimeRangeSelect} initialRange={selectedTimeRange === '1m' ? '1분' : selectedTimeRange === '1h' ? '1시간' : selectedTimeRange === '1w' ? '1주' : selectedTimeRange === '1M' ? '1달' : selectedTimeRange === '1y' ? '1년' : '1시간'} />
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
          </ClientSideOnly>
        </div>
      </div>
    </ClientSideOnly>
  );
};

export default Chart1Page;
