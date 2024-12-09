// Product.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  ShoppingCart as CartIcon,
  Store as StoreIcon,
  AddShoppingCart as AddCartIcon,
} from "@mui/icons-material";
import displayToast from "../../utils/displayToast";

// ProductCard Component
const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/cart/add/${product.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        displayToast({
          type: "success",
          msg: "Product added successfully to the cart!",
        });
      }
    } catch (err) {
      displayToast({ type: "error", msg: "Product addition unsuccessful." });
      console.error(err);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Stock: {product.stockQuantity} units
        </Typography>
        <Typography variant="h6" color="#FF8E53" fontWeight="bold">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
        <Tooltip title="Add to Cart">
          <Button
            variant="contained"
            startIcon={<AddCartIcon />}
            onClick={handleAddToCart}
            sx={{
              bgcolor: "#FF8E53",
              "&:hover": {
                bgcolor: "#FE6B8B",
              },
            }}
          >
            Add to Cart
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

// ProductList Component
const ProductList = ({ products }) => {
  return (
    <Grid container spacing={3} padding={2}>
      {products.map((product, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

// Main Product Component
const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      displayToast({
        type: "error",
        msg: "Error loading products. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
      <Container maxWidth="xl">
        <Box 
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: 3,
            p: 4,
            mb: 4,
          }}
        >
          <Box display="flex" alignItems="center" mb={4}>
            <StoreIcon sx={{ fontSize: 40, mr: 2, color: "#FF8E53" }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
              Product Catalog
            </Typography>
          </Box>

          {products.length === 0 ? (
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No products available
            </Typography>
          ) : (
            <ProductList products={products} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Product;