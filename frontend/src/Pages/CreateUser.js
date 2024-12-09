import React, { useState } from 'react';
import { useHistory } from 'react-router';
import displayToast from '../utils/displayToast';
import { validateInputField } from '../utils/validations';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Cake as CakeIcon,
  Badge as BadgeIcon,
  Numbers as NumbersIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

function CreateUser() {
    const [fullName, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const submitForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (validateInputField({ field: fullName, fieldName: "full name" }) &&
            validateInputField({ field: username, fieldName: "user name" }) &&
            validateInputField({ field: dateOfBirth, fieldName: "dob" }) &&
            validateInputField({ field: age, fieldName: "age" }) &&
            validateInputField({ field: password, fieldName: "password" })) {

            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/user/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        person: {
                            fullName: fullName,
                            age: age,
                            dateOfBirth: dateOfBirth
                        }
                    }),
                });

                if (response.ok) {
                    displayToast({ type: "success", msg: "User added successfully!" });
                    setTimeout(() => {
                        history.push("/");
                    }, 1000);
                }
            } catch (err) {
                displayToast({ type: "error", msg: "User addition unsuccessful." });
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={10}
                    sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: 3,
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{ mb: 3, fontWeight: "bold" }}
                    >
                        Add Employee
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Enter employee details to create an account
                    </Typography>

                    <Box component="form" onSubmit={submitForm} sx={{ width: "100%" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            value={fullName}
                            onChange={(e) => setFullname(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="dateOfBirth"
                            label="Date of Birth"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CakeIcon />
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="age"
                            label="Age"
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NumbersIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                bgcolor: "#FF8E53",
                                "&:hover": {
                                    bgcolor: "#FE6B8B",
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default CreateUser;