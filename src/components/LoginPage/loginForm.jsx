import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { VpnKey, VpnKeyOff } from '@mui/icons-material';
import quickLinks from '../../utils/quickLinks';
import { Buffer } from 'buffer';
import axios from 'axios';

const GGTONERS_API_URL = 'https://api.ggtoners.com';

const LoginForm = () => {
  const { openLocalSlug } = quickLinks();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, toggleLoading] = useState(false);
  const [loadingDialog, toggleLoadingDialog] = useState(false);
  const [dialogText, setDialogText] = useState('');

  const redirect = () => {
    openLocalSlug('/');
  }
  const login = async () => {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    try {
      const { data } = await axios.post(
        `${GGTONERS_API_URL}/admin/login`,
        { username },
        { headers: { 'Authorization': `Basic ${token}` } }
      );

      if (data) {
        document.cookie = `user=${JSON.stringify(data)}`;
      }
      redirect();
    } catch (err) {
      toggleLoading(false);
      if (err.response.data?.errorMessage) {
        setDialogText(err.response.data.errorMessage);
      } else setDialogText('Something went wrong. Please check your username and password, then try again.');
    }
  }
  const submitForm = () => {
    setDialogText('Processing...');
    toggleLoading(true);
    toggleLoadingDialog(true);
    login();
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            autoComplete='username'
            type='username'
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            label='Username'
          />
          <TextField
            fullWidth
            autoComplete='current-password'
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            type={showPassword ? 'text' : 'password'}
            label='Password'
            onKeyDown ={(event) => {
              if (event.key === 'Enter') {
                submitForm();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <VpnKey />
                    ) : (
                      <VpnKeyOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack spacing={3} sx={{ mt: 3 }}>
          <Button
            fullWidth
            disabled={!username || !password}
            variant='contained'
            onClick={submitForm}
          >Login</Button>
        </Stack>
      </Box>
      <Dialog open={loadingDialog} onClose={() => {toggleLoadingDialog(false)}} fullWidth maxWidth='sm'>
        <DialogTitle>Logging In</DialogTitle>
        <DialogContent>
          <Typography variant='subtitle1' component='div'>
            {dialogText}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' disabled={loading} onClick={() => {toggleLoadingDialog(false)}}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginForm;