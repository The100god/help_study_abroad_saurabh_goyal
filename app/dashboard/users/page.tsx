'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TablePagination, 
  TextField, 
  Avatar, 
  Box, 
  Typography, 
  CircularProgress, 
  Button, 
  InputAdornment,
  Chip
} from '@mui/material';
import { Search, Visibility, Business, Email, Phone } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/useDataStore';

export default function UsersPage() {
  const router = useRouter();
  
  // Zustand Store
  const { users, totalUsers, isLoading, fetchUsers } = useDataStore();
  
  // Local State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Debounce Search Logic
  // This ensures we only fetch data 500ms after the user stops typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(rowsPerPage, page * rowsPerPage, searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, page, rowsPerPage, fetchUsers]);

  // 2. Handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on size change
  };

  const handleRowClick = (id: number) => {
    router.push(`/dashboard/users/${id}`);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      
      {/* Header Section */}
      <Paper elevation={2} sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Users Directory
        </Typography>
        <TextField 
          label="Search Users..." 
          variant="outlined" 
          size="small" 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0); // Reset to page 0 when searching
          }}
          sx={{ minWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Table Section */}
      <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer sx={{ maxHeight: 650 }}>
            <Table stickyHeader aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Profile</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Role & Company</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow 
                      hover 
                      key={user.id} 
                      onClick={() => handleRowClick(user.id)}
                      sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' } }}
                    >
                      <TableCell>
                        <Avatar 
                          src={user.image} 
                          alt={user.firstName} 
                          sx={{ border: '1px solid #ddd' }}
                        />
                      </TableCell>
                      
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          @{user.id}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <Email fontSize="inherit" color="action" style={{ fontSize: 14 }} />
                          <Typography variant="body2">{user.email}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Phone fontSize="inherit" color="action" style={{ fontSize: 14 }} />
                          <Typography variant="body2">{user.phone}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {user.company?.title || 'N/A'}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Business fontSize="inherit" color="action" style={{ fontSize: 12 }} />
                          <Typography variant="caption" color="text.secondary">
                            {user.company?.name || 'N/A'}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip 
                          label={user.gender} 
                          size="small" 
                          color={user.gender === 'male' ? 'info' : 'secondary'} 
                          variant="outlined" 
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Button 
                          variant="contained" 
                          size="small" 
                          startIcon={<Visibility />}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            handleRowClick(user.id);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No users found matching "{searchQuery}"
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}