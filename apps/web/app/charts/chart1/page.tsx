'use client';

import React, { useState } from 'react';
import ClientSideOnly from './components/ClientSideOnly';
import { TimeRangeSelector } from './components/TimeRangeSelector';
import Chart1 from './components/Chart1';
import { coinList } from './coinList';
import { CoinSearch } from './components/coinSearch';
const Chart1Page = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>('KRW-BTC');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('24h');
  const [coins, setCoins] = useState<string[]>([
    'KRW-BTC',
    'KRW-DOGE',
    'KRW-XRP',
  ]);

  const handleRemoveCoin = (coinToRemove: string) => {
    setCoins((prevCoins) => prevCoins.filter((coin) => coin !== coinToRemove));
  };

  const handleCoinSelect = (coin: string) => {
    setSelectedCoin(coin);
  };

  const handleTimeRangeSelect = (range: string) => {
    let timeRangeValue: string;
    switch (range) {
      case '1분':
        timeRangeValue = '1m';
        break;
      case '1시간':
        timeRangeValue = '1h';
        break;
      case '1주':
        timeRangeValue = '1w';
        break;
      case '1달':
        timeRangeValue = '1M';
        break;
      case '1년':
        timeRangeValue = '1y';
        break;
      default:
        timeRangeValue = '1h';
    }
    console.log('Time range selected:', timeRangeValue);
    setSelectedTimeRange(timeRangeValue);
  };

  return (
    <div
      style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0' }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: '200px',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRight: '1px solid #e0e0e0',
        }}
      >
        <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Coins</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {coins.map((coin) => (
            <li
              key={coin}
              style={{
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
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
              <button
                onClick={() => handleRemoveCoin(coin)}
                style={{
                  background: 'none',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  cursor: 'pointer',
                  color: 'black',
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '20px',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '1px solid #ccc',
            }}
          ></div>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '1px solid #ccc',
            }}
          ></div>
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '1px solid #ccc',
            }}
          ></div>
        </div>
        <CoinSearch coins={coins} setCoins={setCoins} />
      </div>

      {/* Main Chart Area */}
      <div
        style={{
          flexGrow: 1,
          padding: '20px',
          backgroundColor: '#ffffff',
          margin: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '10px', fontSize: '30px' }}>₿</span>{' '}
          {selectedCoin}
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
  );
};

export default Chart1Page;
