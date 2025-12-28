import React from 'react';
import { Box, Button, Container, Typography, Stack, Paper } from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #f3f4f6 30%, #e3f2fd 90%)',
      }}
    >
      <Container maxWidth="md">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 5, 
            textAlign: 'center', 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" color="primary">
            Candidate Assessment
          </Typography>
          
          <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Next.js App Router • Material UI • Zustand • NextAuth
          </Typography>

          {/* Feature Highlights */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center" 
            sx={{ mb: 6 }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <SecurityIcon color="action" fontSize="large" sx={{ mb: 1 }} />
              <Typography variant="body2" fontWeight="bold">Authentication</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <StorageIcon color="action" fontSize="large" sx={{ mb: 1 }} />
              <Typography variant="body2" fontWeight="bold">State Mgmt</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <SpeedIcon color="action" fontSize="large" sx={{ mb: 1 }} />
              <Typography variant="body2" fontWeight="bold">Optimization</Typography>
            </Box>
          </Stack>

          <Link href="/login" passHref>
            <Button 
              variant="contained" 
              size="large" 
              endIcon={<ArrowForwardIcon />}
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
            >
              Enter Application
            </Button>
          </Link>
        </Paper>
      </Container>
    </Box>
  );
}