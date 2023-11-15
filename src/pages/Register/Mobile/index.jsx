import { Component } from 'react';
import {
  Box,
  TextField,
  Button,
  LinearProgress,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import {
  Info,
  CheckCircle
} from '@mui/icons-material';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email : '',
      password: '',
      copyPassword: '',
      loading: false,
      passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      validPassword: false,
      passwordColor: '#FA3913'
    };
  }
  openInNewTab = () => {
    window.open('/register', '_blank', 'noreferrer');
  };
  validatePassword = (event) => {
    const pass = event.target.value;
    this.setState({ password: pass });
    if (this.state.passwordRegex.test(pass)) {
      this.setState({ validPassword: true});
      this.setState({ passwordColor: ''});
    } 
    else if (this.state.passwordRegex) {
      this.setState({ validPassword: false});
      this.setState({ passwordColor: '#FA3913'});
    }
  };
  onSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    this.setState({ loading: true });
    axios.post(
      'https://api.sh4pesdevelopment.com/api/user',
      JSON.stringify({ name: this.state.name, email: this.state.email, password: this.state.password}),
      {
        headers: {
        'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      if (res.status === 201) {
        this.setState({ loading: false });
        window.location.replace('/successfulregistration');
      } else {
        this.setState({ loading: false });
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      this.setState({ loading: false });
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '5vh', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{ paddingLeft: '2vw', paddingRight: '2vw', paddingTop: '2vh' }}>
              <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes" style={{ width: '300px' }} />
              <h2 style={{ width: '300px', fontSize: '24px'}}>Create Account</h2>
            </div>
            <Box component="form" sx={{  display: 'flex', flexDirection: 'column', width: '100%' }} noValidate autoComplete="off">
              <TextField
                    required
                    label="Name"
                    error={!this.state.name}
                    sx={{ marginBottom: '2vh', width: '100%' }}
                    value={ this.state.name }
                    onChange={(e) =>  this.setState({ name: e.target.value })}
              />
              <TextField
                  required
                  label="Email"
                  error={!this.state.email}
                  sx={{ marginBottom: '2vh', width: '100%' }}
                  value={ this.state.email }
                  onChange={(e) =>  this.setState({ email: e.target.value })}
              />
              <FormControl sx={{ width: '100%', marginBottom: '2vh' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" sx={{ color: this.state.passwordColor }}>Password *</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    sx={{ width: '100%'}}
                    error={!this.state.validPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <Tooltip title={
                          <div>
                            <span style={{ fontSize: '16px'}}>Password Must Contain: </span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• 8 characters long</span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• a lowercase letter</span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• an uppercase letter</span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• a special character</span>
                          </div>
                        }>
                          {
                            !this.state.validPassword ?
                              <Info />
                            :
                              <CheckCircle style={{color: '#38B137'}} />

                          }
                        </Tooltip>
                      </InputAdornment>
                    }
                    onChange={(e) =>  this.validatePassword(e)}
                    label="Password *"
                  />
              </FormControl>
              <FormControl sx={{ width: '100%', marginBottom: '2vh' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" sx={{ color: this.state.passwordColor }}>Verify Password *</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    sx={{ width: '100%'}}
                    error={ (this.state.copyPassword !== this.state.password) && this.state.validPassword || !this.state.copyPassword }
                    endAdornment={
                      <InputAdornment position="end">
                        <Tooltip title={
                          <div>
                            <span style={{ fontSize: '16px'}}>Passwords must match</span>
                          </div>
                        }>
                          {
                            (this.state.copyPassword !== this.state.password) || !this.state.validPassword  ?
                              <Info />
                            :
                              <CheckCircle style={{color: '#38B137'}} />

                          }
                        </Tooltip>
                      </InputAdornment>
                    }
                    onChange={(e) =>  this.setState({ copyPassword: e.target.value })}
                    label="Verify Password *"
                  />
              </FormControl>
                {
                  !this.state.loading ?
                  <>
                      <Button
                        variant="contained"
                        onClick={this.onSubmit}
                        disabled={!(this.state.validPassword && (this.state.copyPassword === this.state.password)) || !this.state.name || !this.state.email}
                        sx={{ width: '100%', bgcolor: '#3780FF' }}
                      >
                          Create Account
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
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', marginTop: '2vh', justifyContent: 'center' }}>
                  <a href="/login">Already have an account?</a>
                </div>
            </Box>
        </div>
        <div style={{ position: 'absolute', bottom: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span style={{ marginRight: '10px', fontSize: '14px', color: '#333333' }}>© 2023 Hill Bomb Creations</span>
            <span id="contact"><a style={{ color: '#333333' }} href="mailto:hello@hbcreations.io">hello@hbcreations.io</a></span>
          </div>
        </div>
      </div>
    );
  }
}