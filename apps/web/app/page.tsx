'use client';

import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          onClick={() => router.push('/charts/chart1')}
          sx={{
            p: 3,
            height: 'auto',
            textAlign: 'left',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h5" gutterBottom>
            가상화폐 차트 조회 웹 서비스
          </Typography>
          <Typography variant="body2" color="text.secondary">
            오지철
          </Typography>
        </Button>

        <Button
          variant="outlined"
          onClick={() => router.push('/charts/chart2')}
          sx={{
            p: 3,
            height: 'auto',
            textAlign: 'left',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h5" gutterBottom>
            정렬 알고리즘 시각 및 청각화 데모
          </Typography>
          <Typography variant="body2" color="text.secondary">
            김무훈
          </Typography>
        </Button>
      </Box>
    </div>
  );
}
