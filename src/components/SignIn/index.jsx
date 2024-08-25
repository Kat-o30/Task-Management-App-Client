import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './styles.css'; // Import your CSS file

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const SignIn = ({ onSignIn }) => {
  const [loginData, setLoginData] = useState({
    Email: '',
    Password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Posting data:", loginData);
      const response = await axios.post(`${apiBaseUrl}/api/login`, loginData);
      console.log("Login response:", response.data);
      onSignIn(response.data);
    } catch (error) {
      console.error('Error creating data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleResponse = async (response) => {
    if (response?.credential) {
      const idToken = response.credential;
      setLoading(true);
      try {
        const { data } = await axios.post(`${apiBaseUrl}/api/login-with-google`, { token: idToken });
        console.log("Login response with Google:", data);
        onSignIn(data);
      } catch (error) {
        console.error('Error logging in with Google:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Email"
            name="Email"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="Password"
            variant="outlined"
            margin="normal"
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? <div className="custom-loader" /> : 'Sign In'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
          >
            <GoogleLogin
              onSuccess={handleGoogleResponse}
              onFailure={handleGoogleResponse}
              useOneTap
            />
          </Button>
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
