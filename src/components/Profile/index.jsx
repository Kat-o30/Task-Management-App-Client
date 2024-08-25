import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Profile = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Profile Section
      </Typography>
      <Box>
        <Typography variant="body1">
          Welcome to your profile!
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
