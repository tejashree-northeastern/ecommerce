// Cart.js
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  DeleteOutline as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
  CreditCard as PaymentIcon,
} from "@mui/icons-material";
import displayToast from "../../utils/displayToast";

// CartItem Component
const CartItem = ({ item, fetchCartItems }) => {
  const onRemove = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/v1/cart/remove/${item.product.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        fetchCartItems();
        displayToast({
          type: "success",
          msg: "Product removed successfully from the cart!",
        });
      }
    } catch (err) {
      displayToast({ type: "error", msg: "Product was not removed." });
      console.error(err);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 2,
        "&:hover": { boxShadow: 3 },
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div">
              {item.product.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography color="text.secondary">
              ${item.product.price.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography color="text.secondary">
              Qty: {item.product.stockQuantity}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <IconButton
              onClick={onRemove}
              color="error"
              sx={{ "&:hover": { transform: "scale(1.1)" } }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Main Cart Component
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory();

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/cart`);
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      displayToast({ type: "error", msg: "Error loading cart items" });
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.product.stockQuantity,
    0
  );

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
            <CartIcon sx={{ fontSize: 30, mr: 2, color: "#FF8E53" }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Shopping Cart
            </Typography>
          </Box>

          <Box mb={4}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  fetchCartItems={fetchCartItems}
                />
              ))
            ) : (
              <Typography variant="h6" textAlign="center" color="text.secondary">
                Your cart is empty
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="right"
            mb={4}
            color="#FF8E53"
          >
            Total: ${total.toFixed(2)}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ShoppingBagIcon />}
                onClick={() => history.push("/shopping")}
                sx={{
                  py: 1.5,
                  color: "#FF8E53",
                  borderColor: "#FF8E53",
                  "&:hover": {
                    borderColor: "#FE6B8B",
                    color: "#FE6B8B",
                  },
                }}
              >
                Continue Shopping
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<PaymentIcon />}
                onClick={() => history.push("/Checkout")}
                sx={{
                  py: 1.5,
                  bgcolor: "#FF8E53",
                  "&:hover": {
                    bgcolor: "#FE6B8B",
                  },
                }}
              >
                Proceed to Checkout
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Cart;