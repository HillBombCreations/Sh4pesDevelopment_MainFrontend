import { Component } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  TextField,
  Button,
  LinearProgress,
  Card,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  VisibilityOff,
  Visibility,
} from '@mui/icons-material';
import FooterComponent from '../../../../universalComponents/footer';

export default class MobileLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      loading: false,
      accountError: '',
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  openInNewTab = () => {
    window.open('/register', '_blank', 'noreferrer');
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios.post(
      'https://api.hbcreations.io/api/user/login',
      JSON.stringify({ email: this.state.email, password: this.state.password}),
      {
        headers: {
        'Content-Type': 'application/json'
        },
        withCredentials: true,
      }
    ).then(res => {
      if (res.status === 200) {
        document.cookie = `user=${JSON.stringify(res.data)}; path=/`;
        window.location.replace('/');
      } else {
        this.setState({ loading: false });
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      if (err.response.status === 400 && err.response.data.error === 'Not verified') this.setState({ accountError: '400'});
      else if (err.response.status === 400 && err.response.data.error !== 'Not verified')  this.setState({ accountError: '402'});
      else this.setState({ accountError: err.response.status.toString()});
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2vh 2vw 2vh 2vw' }}>
        <img src="/assets/hillbombcreations-logo.png" alt="hb logo" style={{ width: '300px', marginTop: '10vh' }} />
        <Box component="form" sx={{  display: 'flex', flexDirection: 'row', marginTop: '2vh' }} noValidate autoComplete="off">
        <div style={{ flexDirection: 'columm', width: '100%', paddingRight: '2vw', paddingLeft: '2vw' }}>
          <Card raised sx={{ bgcolor: '#fffff', paddingTop: '4vh', paddingBottom: '4vh'}}>
              { 
                this.state.accountError === '400' ? 
                  <Alert severity="warning" sx={{ marginX: '8.5vw', marginBottom: '2vh' }}>
                    Please verify email to login
                  </Alert> 
                :
                this.state.accountError === '401' ?
                  <Alert severity="error" sx={{ marginX: '8.5vw', marginBottom: '2vh' }}>
                    We cannot find an account associated with that email
                  </Alert>
                  :
                  this.state.accountError === '402' ?
                  <Alert severity="error" sx={{ marginX: '8.5vw', marginBottom: '2vh' }}>
                    Please enter all fields
                  </Alert> 
                  :
                  null

              }
              <TextField
                  required
                  label="Email"
                  sx={{ marginBottom: '2vh', width: '80%' }}
                  value={ this.state.email }
                  onChange={(e) =>  this.setState({ email: e.target.value })}
              />
              <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                        edge="end"
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={(e) =>  this.setState({ password: e.target.value })}
                  label="Password*"
                />
              </FormControl>
              {!this.state.loading ?
              <>
                  <Button
                    variant="contained"
                    onClick={this.onSubmit}
                    sx={{ marginBottom: '2vh', width: '80%', marginTop: '20px', }}
                  >
                      Login
                  </Button>
              </>
              :
              <>
                  <LinearProgress
                      sx={{
                          color: '#3780FF',
                          marginX: '10vw',
                          marginTop: '20px',
                      }}
                  />
              </>
              }
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', justifyContent: 'center' }}>
                <a href="/forgotpassword">Forgot Password?</a>
              </div>
              <Divider style={{ marginRight: '2vw', marginLeft: '2vw', marginBottom: '2vh'}} >or</Divider>
              <Button
                variant="contained"
                onClick={this.openInNewTab}
                sx={{ width: '60%', bgcolor: '#38B137' }}
              >
                  Create Account
              </Button>
            </Card>
          </div>
        </Box>
        <div style={{ position: 'absolute', bottom: '0' }}>
          <FooterComponent />
        </div>
      </div>
    );
  }
}