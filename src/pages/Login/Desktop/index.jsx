import { Component } from 'react';
import {
  Box,
  TextField,
  Button,
  LinearProgress,
  Card,
  Divider,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Alert,
  OutlinedInput,
} from "@mui/material";
import {
  VisibilityOff,
  Visibility,
} from '@mui/icons-material';
import axios from 'axios';
import FooterComponent from '../../../universalComponents/footer';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      loading: false,
      showPassword: false,
      accountError: '',
    };
  }
  openInNewTab = () => {
    window.open('/register', '_blank', 'noreferrer');
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios.post(
      // https://api.sh4pesdevelopment.com/api/user/login
      'http://localhost:5000/api/user/login',
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
        this.setState({ accountError: res.status.toString()});
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
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: '15vw', paddingLeft: '15vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '30vh', alignItems: 'center', paddingRight: '5vw'}}>
            <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes" style={{ width: '480px' }} />
            <p style={{ width: '480px', fontSize: '24px'}}>Empower your online presence and streamline finances effortlessly on Sh4pes Development</p>
          </div>
            <Box component="form" sx={{  display: 'flex', flexDirection: 'row', marginTop: '30vh' }} noValidate autoComplete="off">
              <Card raised sx={{ bgcolor: '#fffff', paddingTop: '4vh', paddingBottom: '4vh', width: '30vw'}}>
              { this.state.accountError === '400' ? 
                  <Alert severity="warning" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                    Please verify email to login
                  </Alert> 
                :
                this.state.accountError === '401' ?
                  <Alert severity="error" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                    We cannot find an account associated with that email
                  </Alert>
                  :
                  this.state.accountError === '402' ?
                  <Alert severity="error" sx={{ marginX: '2.6vw', marginBottom: '2vh' }}>
                    Please enter all fields
                  </Alert> 
                  :
                  null

              }
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <TextField
                      required
                      label="Email"
                      sx={{ marginBottom: '2vh', width: '25vw' }}
                      value={ this.state.email }
                      onChange={(e) =>  this.setState({ email: e.target.value })}
                  />
                  <FormControl sx={{ m: 1, width: '25vw', marginBottom: '2vh' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        sx={{ width: '25vw'}}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                              edge="end"
                            >
                              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        onChange={(e) =>  this.setState({ password: e.target.value })}
                        label="Password *"
                      />
                    </FormControl>
                    {
                      !this.state.loading ?
                      <>
                          <Button
                            variant="contained"
                            onClick={this.onSubmit}
                            sx={{ marginBottom: '2vh', width: '25vw' }}
                            >
                              Login
                          </Button>
                      </>
                      :
                      <>
                          <LinearProgress
                              sx={{
                                color: '#3780FF',
                                marginX: '2.5vw',
                            }}
                        />
                    </>
                  }
              </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', justifyContent: 'center' }}>
                  <a href="/forgotpassword">Forgot Password?</a>
                </div>
                <Divider style={{ background: "#e8f0ff", marginRight: '1vw', marginLeft: '1vw', marginBottom: '2vh'}} />
                <Button
                  variant="contained"
                  onClick={this.openInNewTab}
                  sx={{ width: '50%', bgcolor: '#38B137' }}
                >
                    Create Account
                </Button>
            </Card>
          </Box>
        </div>
        <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
          <FooterComponent />
        </div>
      </div>
    );
  }
}