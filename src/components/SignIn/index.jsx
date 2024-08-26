import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import './styles.css'; 

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const SignIn = ({ onSignIn }) => {
  const [userData, setUserData] = useState({
    email: '',  
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Posting data:", userData);
      const response = await axios.post(`${apiBaseUrl}/api/user`, userData);
      console.log("Login response:", response.data);
      onSignIn(response.data);
    } catch (error) {
      console.error('Error creating data:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
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
          name="email"  
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"  
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
          disabled={loading} 
        >
          {loading ? <div className="custom-loader" /> : 'Sign In'}
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
