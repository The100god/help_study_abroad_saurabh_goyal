'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Box, Button, Typography, Paper, Rating, Chip, MobileStepper, Divider, CircularProgress 
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Product } from '@/types';

export default function SingleProductPage() {
  const params = useParams(); // Get ID from URL
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // FIX ADDED HERE
    if (!params?.id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${params.id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [params?.id]);
  // Carousel Logic
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  if (loading) return <Box p={4} display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (!product) return <Typography>Product not found.</Typography>;

  const maxSteps = product.images.length;

  return (
    <Box p={3}>
      <Button 
        startIcon={<KeyboardArrowLeft />} 
        onClick={() => router.back()} 
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {/* Left Column: Image Carousel */}
          <Box>
            <Box 
              component="img"
              sx={{
                height: 400,
                display: 'block',
                maxWidth: '100%',
                overflow: 'hidden',
                width: '100%',
                objectFit: 'contain',
                bgcolor: '#f5f5f5',
                borderRadius: 2
              }}
              src={product.images[activeStep]}
              alt={product.title}
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  <KeyboardArrowLeft /> Back
                </Button>
              }
            />
          </Box>

          {/* Right Column: Product Details */}
          <Box>
            <Typography variant="h4" gutterBottom>{product.title}</Typography>
            
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.rating} / 5)
              </Typography>
            </Box>

            <Box display="flex" gap={1} mb={3}>
               <Chip label={product.category} color="primary" variant="outlined" />
               <Chip label={`Stock: ${Math.floor(Math.random() * 50)}`} color="success" variant="outlined" />
            </Box>

            <Typography variant="h4" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
              ${product.price}
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>Specifications</Typography>
            {/* Dummy specs as the API doesn't return deep specs for all items */}
            {/* <Typography variant="body2"><strong>Brand:</strong> {product. || 'Generic'}</Typography> */}
            <Typography variant="body2"><strong>SKU:</strong> {product.id + 9000}</Typography>
            <Typography variant="body2"><strong>Warranty:</strong> 2 Years Manufacturer</Typography>

            <Box mt={4}>
                <Button variant="contained" size="large" fullWidth>
                    Add to Cart
                </Button>
            </Box>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
}