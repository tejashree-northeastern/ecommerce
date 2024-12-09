import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

function Home() {
  const history = useHistory();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            p: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Typography
            component="h1"
            variant="h3"
            sx={{ 
              mb: 4, 
              fontWeight: "bold",
              color: "#2C3E50",
              textAlign: "center"
            }}
          >
            Welcome to Our Marketplace
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ 
              mb: 6,
              textAlign: "center",
              maxWidth: "600px"
            }}
          >
            Discover amazing products and start your shopping journey with us
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => history.push("/shopping")}
            startIcon={<ShoppingCartIcon />}
            sx={{
              py: 2,
              px: 6,
              fontSize: "1.2rem",
              borderRadius: 2,
              textTransform: "none",
              bgcolor: "#FF8E53",
              "&:hover": {
                bgcolor: "#FE6B8B",
              },
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              minWidth: "300px",
            }}
          >
            Start Shopping
          </Button>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 3,
              justifyContent: "center",
              width: "100%",
            }}
          >
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;