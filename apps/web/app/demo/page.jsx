'use client';

import { css } from '../../styled-system/css';
import { Button } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
  title: {
    text: 'My First Highchart',
  },
  series: [
    {
      type: 'line',
      name: 'Demo Line',
      data: [1, 3, 2, 4],
    },
  ],
};

const pageStyles = css({
  display: 'grid',
  gridTemplateRows: '20px 1fr 20px',
  alignItems: 'center',
  justifyItems: 'center',
  minHeight: '100svh',
  padding: '80px',
  gap: '64px',
  fontSynthesis: 'none',
  '@media (max-width: 600px)': {
    padding: '32px',
    paddingBottom: '80px',
  },
});

export default function Home() {
  return (
    <div className={pageStyles}>
      <h1>demo</h1>
      <Button>mui button</Button>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
