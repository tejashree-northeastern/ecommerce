import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  ReceiptLong as ReceiptIcon,
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as ShippingIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import displayToast from "../../utils/displayToast";

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const {
    "Invoice Date": invoiceDate,
    "Order ID": orderId,
    Items: items = [],
  } = checkoutItems;

  const totalPrice = items
    ? items.reduce((total, item) => total + item.Price * item.Quantity, 0)
    : 0;

  const fetchCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/checkout`);
      const data = await response.json();
      setCheckoutItems(data);
      displayToast({ type: "success", msg: "Order placed successfully." });
    } catch (error) {
      console.error("Error displaying checkout:", error);
      displayToast({
        type: "error",
        msg: "Couldn't place your order. Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
        }}
      >
        <CircularProgress sx={{ color: "white" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
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
            background: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Box display="flex" alignItems="center" mb={4}>
            <ReceiptIcon sx={{ fontSize: 30, mr: 2, color: "#FF8E53" }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Invoice
            </Typography>
          </Box>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Invoice Date
              </Typography>
              <Typography variant="h6">{invoiceDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Order ID
              </Typography>
              <Typography variant="h6">{orderId}</Typography>
            </Grid>
          </Grid>

          <Typography variant="h6" mb={2} fontWeight="bold">
            <InventoryIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Items
          </Typography>

          {items.map((item, index) => (
            <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {item["Product Name"]}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography color="text.secondary">
                      ${item.Price} × {item.Quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography fontWeight="bold" color="#FF8E53">
                      ${(item.Price * item.Quantity).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box display="flex" justifyContent="space-between" mb={4}>
            <Typography variant="h5" fontWeight="bold">
              Total Amount
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="#FF8E53">
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <ShippingIcon sx={{ color: "#FF8E53", fontSize: 40 }} />
            <Button
              variant="contained"
              startIcon={<ShoppingBagIcon />}
              onClick={() => history.push("/shopping")}
              sx={{
                py: 1.5,
                px: 4,
                bgcolor: "#FF8E53",
                "&:hover": {
                  bgcolor: "#FE6B8B",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Checkout;