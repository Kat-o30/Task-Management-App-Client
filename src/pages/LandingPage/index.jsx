import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography, Avatar, CircularProgress, Dialog, IconButton, TextField, Box, Divider } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import SignIn from '../../components/SignIn';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/40');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [loginData, setLoginData] = useState({});

  const navigate = useNavigate();

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleSignIn = (data) => {
    setLoading(true);
    setLoginData(data);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
      setShowSignIn(false);
    }, 2000);
  };

  const handleSignInWithGoogle = () => {
    setLoading(true);
    const googleSignInData = {
      name: 'Google User',
      email: 'user@gmail.com',
    };
    handleSignIn(googleSignInData);
  };

  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  const handleAdminClick = () => {
    setShowAdminDialog(true);
  };

  const handleCloseAdminDialog = () => {
    setShowAdminDialog(false);
  };

  const handleCreateWorkspace = () => {
    setShowAdminDialog(false);
    navigate('/workspace');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Landing Page
          </Typography>
          {!isLoggedIn ? (
            <Button color="inherit" onClick={handleSignInClick}>
              Sign In
            </Button>
          ) : (
            <div>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: 'none' }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
                <Avatar
                  src={profileImage}
                  sx={{ cursor: 'pointer' }}
                  component="span"
                />
              </label>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Button variant="contained" color="primary" onClick={handleAdminClick}>
          Create a workspace
        </Button>
      </Container>

      {loading ? (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <Container>
          <Typography variant="h4">Landing Page Content</Typography>
        </Container>
      )}

      <Dialog open={showSignIn} onClose={handleCloseSignIn}>
        <Container sx={{ position: 'relative', padding: 3, width: 400 }}>
          <IconButton aria-label="close" onClick={handleCloseSignIn} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              X
            </Typography>
          </IconButton>
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
            Sign In
          </Typography>
          <SignIn onSignIn={handleSignIn} onSignInWithGoogle={handleSignInWithGoogle} />
          <Divider sx={{ my: 2 }}>OR</Divider>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              textTransform: 'none',
              borderColor: '#4285F4',
              color: '#4285F4',
              '&:hover': {
                backgroundColor: '#f1f3f4',
                borderColor: '#4285F4',
              },
            }}
            onClick={handleSignInWithGoogle}
          >
            Sign in with Google
          </Button>
        </Container>
      </Dialog>

      <Dialog open={showAdminDialog} onClose={handleCloseAdminDialog}>
        <Container sx={{ position: 'relative', padding: 3, width: 400 }}>
          <IconButton aria-label="close" onClick={handleCloseAdminDialog} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              X
            </Typography>
          </IconButton>
          <Typography variant="h4" gutterBottom>
            Create Workspace
          </Typography>
          <TextField
            fullWidth
            label="Workspace Name"
            variant="outlined"
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleCreateWorkspace}
          >
            Create
          </Button>
        </Container>
      </Dialog>
    </>
  );
};

export default LandingPage;
