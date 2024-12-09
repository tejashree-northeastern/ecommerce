import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Container,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Person as PersonIcon,
  ShoppingCart as CartIcon,
  Logout as LogoutIcon,
  Store as StoreIcon,
} from "@mui/icons-material";
import displayToast from "../utils/displayToast";

function Sidenav() {
  const history = useHistory();
  const { isLoggedIn, setUserData } = useContext(AuthContext);

  const logoutUser = () => {
    displayToast({
      type: "success",
      msg: "Logged out successfully!"
    });
    setTimeout(() => {
      setUserData(null);
      history.push("/");
    }, 1000);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #FF8E53 0%, #FE6B8B 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: '64px',
          }}
        >
          {/* Logo and Brand */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <StoreIcon 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 1,
                fontSize: '28px'
              }} 
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MARKETPLACE
            </Typography>
          </Box>

          {/* Right-side Actions */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* Cart Button */}
            <Tooltip title="Shopping Cart">
              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <Badge color="error">
                  <CartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Account/Logout Button */}
            <Tooltip title="Logout">
              <Button
                onClick={logoutUser}
                startIcon={<LogoutIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                  },
                  display: { xs: 'none', sm: 'flex' },
                }}
                variant="outlined"
              >
                Logout
              </Button>
            </Tooltip>

            {/* Mobile Logout Icon */}
            <IconButton
              onClick={logoutUser}
              sx={{
                color: 'white',
                display: { xs: 'flex', sm: 'none' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Sidenav;