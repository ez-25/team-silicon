'use client';

'use client';

import React, { useState } from 'react';
import ClientSideOnly from '../../../components/ClientSideOnly';
import { TimeRangeSelector } from '../../../components/TimeRangeSelector';
import Chart1 from '../../../components/Chart1';

const Chart1Page = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('24h');

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
            <TimeRangeSelector
              onSelect={handleTimeRangeSelect}
              initialRange={
                selectedTimeRange === '1m'
                  ? '1분'
                  : selectedTimeRange === '1h'
                    ? '1시간'
                    : selectedTimeRange === '1w'
                      ? '1주'
                      : selectedTimeRange === '1M'
                        ? '1달'
                        : selectedTimeRange === '1y'
                          ? '1년'
                          : '1시간'
              }
            />
            <Chart1
              selectedCoin={selectedCoin}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeSelect={handleTimeRangeSelect}
              onCoinSelect={handleCoinSelect}
            />
          </ClientSideOnly>
        </div>
      </div>
    </ClientSideOnly>
  );
};

export default Chart1Page;
