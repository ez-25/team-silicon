'use client';

import React, { useState } from 'react';
import { Button, ButtonGroup, buttonGroupClasses } from '@mui/material';

interface TimeRangeSelectorProps {
  onSelect: (range: string) => void;
  initialRange?: string;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  onSelect,
  initialRange = '1시간',
}) => {
  const [selectedRange, setSelectedRange] = useState(initialRange);

  const ranges = ['1분', '1시간', '1주', '1달', '1년'];

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    onSelect(range);
  };

  return (
    <ButtonGroup sx={{ margin : '1rem 0' }} variant="outlined" aria-label="outlined button group">
      {ranges.map((range) => (
        <Button 
          key={range}
          onClick={() => handleSelect(range)}
          disabled={selectedRange === range}
        >
          {range}
        </Button>
      ))}
    </ButtonGroup>
  );
};
