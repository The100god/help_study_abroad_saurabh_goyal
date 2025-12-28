'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Box, Button, Typography, Paper, Grid, Avatar, Divider, CircularProgress } from '@mui/material';
import { KeyboardArrowLeft, Email, Phone, Business } from '@mui/icons-material';
import { User } from '@/types';

export default function SingleUserPage() {
  // useParams() keys match your folder name. Ensure folder is named [id]
  const params = useParams(); 
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Guard clause to prevent fetching "undefined"
    if (!params?.id) return;

    setLoading(true);
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    axios.get(`https://dummyjson.com/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [params]); // FIX: Dependency update

  if (loading) return <Box p={4} display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (!user) return <Typography p={4}>User not found.</Typography>;

  return (
    <Box p={3}>
      <Button startIcon={<KeyboardArrowLeft />} onClick={() => router.back()} sx={{ mb: 3 }}>
        Back to Users
      </Button>

      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Grid spacing={3} alignItems="center">
          {/* FIX: Use sx prop for layout styles to avoid grid type errors */}
          <Box  display="flex"
            flexDirection="column"
            alignItems="center">
            <Avatar 
              src={user.image} 
              sx={{ width: 120, height: 120, mb: 2, border: '4px solid #1976d2' }} 
            />
            <Typography variant="h5" fontWeight="bold" align="center">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color="text.secondary" align="center">{user.company.title}</Typography>
          </Box>

          {/* <Grid item xs={12} sm={8} component="div"> */}
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" alignItems="center" gap={2}>
                <Email color="action" />
                <Typography>{user.email}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Phone color="action" />
                <Typography>{user.phone}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Business color="action" />
                <Typography>{user.company.name}</Typography>
              </Box>
              
              <Divider sx={{ my: 1 }} />
              
              {/* <Grid container component="div"> */}
                 <Box>
                    <Typography variant="caption" color="text.secondary">Gender</Typography>
                    <Typography>{user.gender}</Typography>
                 </Box>
                 {/* <Grid item xs={6} component="div">
                    <Typography variant="caption" color="text.secondary">Age</Typography>
                    <Typography>{user.age || 'N/A'}</Typography>
                 </Grid> */}
              {/* </Grid> */}
            </Box>
          {/* </Grid> */}
        </Grid>
      </Paper>
    </Box>
  );
}