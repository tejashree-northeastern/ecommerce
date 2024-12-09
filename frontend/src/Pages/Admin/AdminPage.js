import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import {
  AddCircle as AddIcon,
  DeleteOutline as DeleteIcon,
  ListAlt as OrdersIcon,
  Dashboard as DashboardIcon,
  KeyboardArrowRight as ArrowIcon,
} from '@mui/icons-material';

function AdminPage() {
  const history = useHistory();

  const adminActions = [
    {
      title: 'Create Product',
      description: 'Add new products to the catalog',
      icon: <AddIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      path: '/create-product',
      color: '#4CAF50',
    },
    {
      title: 'Remove Product',
      description: 'Remove products from the catalog',
      icon: <DeleteIcon sx={{ fontSize: 40, color: '#f44336' }} />,
      path: '/remove-product',
      color: '#f44336',
    },
    {
      title: 'View Orders',
      description: 'Manage and track customer orders',
      icon: <OrdersIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
      path: '/orders',
      color: '#2196F3',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
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
            background: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Box 
            display="flex" 
            alignItems="center" 
            mb={6}
          >
            <DashboardIcon 
              sx={{ 
                fontSize: 40, 
                mr: 2, 
                color: "#FF8E53" 
              }} 
            />
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="text.primary"
            >
              Admin Dashboard
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {adminActions.map((action, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                    borderRadius: 2,
                  }}
                >
                  <CardContent
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 4,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      {action.icon}
                      <Typography
                        variant="h5"
                        component="h2"
                        fontWeight="bold"
                        ml={2}
                      >
                        {action.title}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      mb={3}
                      flexGrow={1}
                    >
                      {action.description}
                    </Typography>

                    <Button
                      variant="contained"
                      onClick={() => history.push(action.path)}
                      endIcon={<ArrowIcon />}
                      sx={{
                        mt: 'auto',
                        bgcolor: action.color,
                        '&:hover': {
                          bgcolor: action.color,
                          opacity: 0.9,
                        },
                      }}
                    >
                      {action.title}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default AdminPage;