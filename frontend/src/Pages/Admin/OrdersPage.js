import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ShoppingBasket as OrdersIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  ArrowBackIos as PrevIcon,
  Schedule as PendingIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as DeliveredIcon,
} from '@mui/icons-material';
import displayToast from '../../utils/displayToast';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError('Error fetching orders');
      displayToast({
        type: 'error',
        msg: 'Error loading orders'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <PendingIcon />;
      case 'shipped':
        return <ShippingIcon />;
      case 'delivered':
        return <DeliveredIcon />;
      default:
        return <PendingIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'info';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  const updateStatus = async (orderId, type) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/orders/${type}/${orderId}`, {
        method: 'POST'
      });
      const updatedOrder = await response.json();
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      displayToast({
        type: 'success',
        msg: 'Order status updated successfully'
      });
    } catch (error) {
      displayToast({
        type: 'error',
        msg: 'Error updating order status'
      });
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
            <OrdersIcon sx={{ fontSize: 40, mr: 2, color: '#FF8E53' }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Orders Management
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="outlined"
            startIcon={<BackIcon />}
            onClick={() => history.push('/admin')}
            sx={{
              mb: 4,
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

          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid item xs={12} md={6} key={order.id}>
                <Card
                  sx={{
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" component="h2">
                        Order #{order.id}
                      </Typography>
                      <Chip
                        icon={getStatusIcon(order.stateType)}
                        label={order.stateType}
                        color={getStatusColor(order.stateType)}
                        variant="outlined"
                      />
                    </Box>

                    <Box display="flex" justifyContent="space-between" mt={3}>
                      <Tooltip title="Previous State">
                        <Button
                          variant="outlined"
                          startIcon={<PrevIcon />}
                          onClick={() => updateStatus(order.id, 'prev')}
                          size="small"
                        >
                          Previous
                        </Button>
                      </Tooltip>

                      <Tooltip title="Next State">
                        <Button
                          variant="contained"
                          endIcon={<NextIcon />}
                          onClick={() => updateStatus(order.id, 'next')}
                          size="small"
                          sx={{
                            bgcolor: '#FF8E53',
                            '&:hover': {
                              bgcolor: '#FE6B8B',
                            },
                          }}
                        >
                          Next
                        </Button>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {orders.length === 0 && (
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No orders found
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default OrdersPage;