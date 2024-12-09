import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ArrowBack as BackIcon,
  DeleteSweep as DeleteAllIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import displayToast from '../../utils/displayToast';

function RemoveProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError('Error fetching products');
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectOne = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const deleteProduct = async (id) => {
    setIsDeleting(true);
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/products/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            setProducts(products.filter(product => product.id !== id));
            displayToast({
                type: 'success',
                msg: 'Product deleted successfully!'
            });
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        setError('Error deleting product');
        displayToast({
            type: 'error',
            msg: 'Error deleting product'
        });
    } finally {
        setIsDeleting(false);
    }
};

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
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
              Remove Products
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<BackIcon />}
              onClick={() => history.push('/admin')}
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
              variant="contained"
              color="error"
              startIcon={<DeleteAllIcon />}
              onClick={deleteProduct}
              disabled={selectedProducts.length === 0 || isDeleting}
              sx={{ ml: 'auto' }}
            >
              {isDeleting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                `Delete Selected (${selectedProducts.length})`
              )}
            </Button>
          </Box>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={products.length > 0 && selectedProducts.length === products.length}
                      indeterminate={selectedProducts.length > 0 && selectedProducts.length < products.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    hover
                    selected={selectedProducts.includes(product.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectOne(product.id)}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{product.stockQuantity}</TableCell>
                    <TableCell align="right">
                    <IconButton
                      color="error"
                        onClick={() => deleteProduct(product.id)}
                      s>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}

export default RemoveProduct;