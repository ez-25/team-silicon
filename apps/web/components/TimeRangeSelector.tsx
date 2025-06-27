"use client";

import React, { useState } from 'react';
import { css } from '../styled-system/css';

interface TimeRangeSelectorProps {
  onSelect: (range: string) => void;
  initialRange?: string;
}

const buttonStyle = css({
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: '#f0f0f0',
  cursor: 'pointer',
  _hover: {
    backgroundColor: '#e0e0e0',
  },
  _active: {
    backgroundColor: '#d0d0d0',
  },
});

const selectedButtonStyle = css({
  backgroundColor: '#007bff',
  color: 'white',
  borderColor: '#007bff',
  _hover: {
    backgroundColor: '#0056b3',
  },
});

const containerStyle = css({
  display: 'flex',
  gap: '8px',
  position: 'absolute',
  top: '20px',
  right: '20px',
  zIndex: '10',
});

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onSelect, initialRange = '1시간' }) => {
  const [selectedRange, setSelectedRange] = useState(initialRange);

  const ranges = ['1분', '1시간', '1주', '1달', '1년'];

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    onSelect(range);
  };

  return (
    <div className={containerStyle}>
      {ranges.map((range) => (
        <button
          key={range}
          className={`${buttonStyle} ${selectedRange === range ? selectedButtonStyle : ''}`}
          onClick={() => handleSelect(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
};
