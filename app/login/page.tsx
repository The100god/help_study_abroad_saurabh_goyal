'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('kminchelle'); // Default for demo
  const [password, setPassword] = useState('0lelplR');    // Default for demo
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/dashboard/users');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Typography component="h1" variant="h5">Sign in</Typography>
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal" fullWidth label="Username" 
            value={username} onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal" fullWidth label="Password" type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}