import { Component } from 'react';
import {
  Box,
  TextField,
  Button,
  LinearProgress,
  Card,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Divider,
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
      passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*#?&]{8,}$/,
      validPassword: false,
      passwordColor: '#FA3913'
    };
  }
  openInNewTab = () => {
    window.open('https://www.sh4pesdevelopment.com/register', '_blank', 'noreferrer');
  };
  // ^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*#?&]{8,}$
  // 'https://api.sh4pesdevelopment.com/api/user/login',
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
    // 'https://api.sh4pesdevelopment.com/api/user'
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
        console.log('SUCCESSFULLY CReATED USER');
        // window.location.replace('/');
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingRight: '15vw', paddingLeft: '15vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8vh', alignItems: 'center'}}>
          <Card raised sx={{ bgcolor: '#fffff'}}>
            <div style={{ paddingLeft: '2vw', paddingRight: '2vw', paddingTop: '2vh' }}>
              <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes" style={{ width: '480px' }} />
              <h2 style={{ width: '480px', fontSize: '24px'}}>Create Account</h2>
            </div>
            <Divider style={{ background: "#e8f0ff", marginBottom: '2vh'}} />
            <Box component="form" sx={{  display: 'flex', flexDirection: 'column', paddingX: '4vw', paddingY:'4vh' }} noValidate autoComplete="off">
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
        </Card>
        </div>
        <div style={{ position: 'absolute', bottom: '0', left: '40vw' }}>
            <span style={{ marginRight: '10px', fontSize: '14px', color: '#333333' }}>© 2023 Hill Bomb Creations</span>
            <span id="contact"><a style={{ color: '#333333' }} href="mailto:hello@hbcreations.io">hello@hbcreations.io</a></span>
        </div>
      </div>
    );
  }
}