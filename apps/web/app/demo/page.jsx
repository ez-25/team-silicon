'use client';

import styles from '../page.module.css';
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

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>demo</h1>
      <Button>mui button</Button>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
