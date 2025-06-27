'use client';

import React, { useEffect, useState } from 'react';
import { createCustomFetch, makeFetchMethods, HttpError } from '../../../shared/fetch/customFetch';

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

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch candlestick data for BTC/KRW, 24-hour interval
        // Bithumb API for candlestick data: /public/candlestick/{order_currency}_{payment_currency}/{chart_intervals}
        // Example: /public/candlestick/BTC_KRW/24h
        const data = await bithumbApi.get(`/public/candlestick/${selectedCoin}_KRW/24h`);
        if (data.status === '0000') {
          setBitcoinData(data.data);
        } else {
          setError(data.message || 'Failed to fetch data');
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
      } finally {
        setLoading(false);
      }
    };

    if (selectedCoin) {
      fetchBitcoinData();
    }
  }, [selectedCoin]);

  const handleCoinSelect = (coin: string) => {
    setSelectedCoin(coin);
  };

  return (
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
        {loading && <p>Loading {selectedCoin} data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {bitcoinData && bitcoinData.length > 0 && !loading && !error && (
          <div>
            <h3 style={{ marginBottom: '10px' }}>{selectedCoin} Chart (Last 24h)</h3>
            {/* Simple representation of a chart based on the image */}
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
              {/* This is a very basic visual representation, a real chart would use a library like Chart.js or D3 */}
              {bitcoinData.slice(0, 10).map((dataPoint: CandlestickData, index: number) => {
                // dataPoint structure: [timestamp, opening price, closing price, high price, low price, volume]
                const closePrice = parseFloat(dataPoint[2]);
                const maxPrice = Math.max(...bitcoinData.map((d: CandlestickData) => parseFloat(d[2])));
                const minPrice = Math.min(...bitcoinData.map((d: CandlestickData) => parseFloat(d[2])));
                const range = maxPrice - minPrice;
                const heightPercentage = range > 0 ? ((closePrice - minPrice) / range) * 80 + 10 : 50; // Scale to 10-90% height

                return (
                  <div
                    key={index}
                    style={{
                      width: '8%',
                      height: `${heightPercentage}%`,
                      backgroundColor: '#007bff',
                      margin: '0 1%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '10px',
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                    }}
                    title={`Price: ${closePrice}`}
                  >
                  </div>
                );
              })}
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
    </div>
  );
};

export default Chart1Page;
