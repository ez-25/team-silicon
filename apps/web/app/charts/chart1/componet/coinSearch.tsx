{
  /* 검색 */
}
import React, { useState } from 'react';
import { coinList } from '../../../../shared/coinList';

export const CoinSearch = ({ coins, setCoins }: { coins: string[], setCoins: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoins, setFilteredCoins] = useState(coinList);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const lowercasedValue = value.toLowerCase();
      const newFilteredCoins = coinList.filter(coin =>
        coin.korean_name.toLowerCase().includes(lowercasedValue) ||
        coin.english_name.toLowerCase().includes(lowercasedValue) ||
        coin.market.toLowerCase().includes(lowercasedValue)
      );
      setFilteredCoins(newFilteredCoins);
    } else {
      setFilteredCoins(coinList);
    }
  };

  const handleCoinClick = (coinMarket: string) => {
    if (!coins.includes(coinMarket)) {
      setCoins(prevCoins => [...prevCoins, coinMarket]);
    }
    setSearchTerm('');
    setFilteredCoins(coinList);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Search coins..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />
      {searchTerm && (
        <ul style={{
          listStyle: 'none',
          padding: '0',
          margin: '5px 0 0 0',
          border: '1px solid #eee',
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: 'white',
          position: 'absolute',
          width: 'calc(100% - 40px)', // Adjust based on parent padding/margin
          zIndex: 1000,
        }}>
          {filteredCoins.map(coin => (
            <li
              key={coin.market}
              onClick={() => handleCoinClick(coin.market)}
              style={{
                padding: '8px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
              }}
            >
              {coin.korean_name} ({coin.market})
            </li>
          ))}
          {filteredCoins.length === 0 && (
            <li style={{ padding: '8px', color: '#888' }}>No coins found.</li>
          )}
        </ul>
      )}
    </div>
  );
};
