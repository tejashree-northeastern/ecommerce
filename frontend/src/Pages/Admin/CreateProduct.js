import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  AttachMoney as PriceIcon,
  Label as NameIcon,
  ProductionQuantityLimits as QuantityIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import displayToast from '../../utils/displayToast';

function CreateProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!name || !price || !quantity) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          stockQuantity: parseInt(quantity, 10)
        })
      });

      if (response.ok) {
        displayToast({
          type: 'success',
          msg: 'Product created successfully!'
        });
        setTimeout(() => history.push('/admin'), 1500);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      setError('Failed to create product. Please try again.');
      displayToast({
        type: 'error',
        msg: 'Error creating product'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Box display="flex" alignItems="center" mb={4}>
            <InventoryIcon sx={{ fontSize: 40, mr: 2, color: '#FF8E53' }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Create New Product
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NameIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PriceIcon />
                  </InputAdornment>
                ),
                inputProps: { min: 0, step: "0.01" }
              }}
            />

            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <QuantityIcon />
                  </InputAdornment>
                ),
                inputProps: { min: 0 }
              }}
            />

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => history.push('/admin')}
                startIcon={<BackIcon />}
                sx={{
                  color: '#FF8E53',
                  borderColor: '#FF8E53',
                  '&:hover': {
                    borderColor: '#FE6B8B',
                    color: '#FE6B8B',
                  },
                }}
              >
                Back to Dashboard
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  flexGrow: 1,
                  bgcolor: '#FF8E53',
                  '&:hover': {
                    bgcolor: '#FE6B8B',
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Create Product'
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreateProduct;