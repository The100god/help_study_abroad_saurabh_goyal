'use client';

import React, { useEffect, useState } from 'react';
import { 
  Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, 
  Select, MenuItem, FormControl, InputLabel, Box 
} from '@mui/material';
import { useDataStore } from '@/store/useDataStore';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();
  const { products, fetchProducts } = useDataStore();
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts(10, 0, '', category);
  }, [category, fetchProducts]);

  return (
    <Box p={2}>
      <Box mb={3} display="flex" justifyContent="space-between">
        <Typography variant="h4">Products</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select 
            value={category} 
            label="Category" 
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="laptops">Laptops</MenuItem>
            <MenuItem value="smartphones">Smartphones</MenuItem>
            {/* Add more dynamic categories if needed */}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.thumbnail}
                alt={product.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price} - {product.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => router.push(`/dashboard/products/${product.id}`)}>
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}