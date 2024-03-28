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
  CheckCircle,
  ErrorOutline
} from '@mui/icons-material';
import axios from 'axios';
import FooterComponent from '../../../../universalComponents/footer';

export default class DesktopRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email : '',
      password: '',
      copyPassword: '',
      loading: false,
      passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      validPassword: false,
      validEmail: false,
      passwordColor: '#d32f2f'
    };
  }
  openInNewTab = () => {
    window.open('/register', '_blank', 'noreferrer');
  };
  validateEmail = (event) => {
    const email = event.target.value;
    this.setState({ email: email });
    if (this.state.emailRegex.test(email)) {
      this.setState({ validEmail: true});
    } 
    else if (this.state.email) {
      this.setState({ validEmail: false});
    }
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
      this.setState({ passwordColor: '#d32f2f'});
    }
  };
  onSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    this.setState({ loading: true });
    axios.post(
      'https://api.hbcreations.io/api/user',
      JSON.stringify({ 
          username: this.state.username,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
      }),
      {
        headers: {
        'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      if (res.status === 201) {
        this.setState({ loading: false });
        window.location.replace('/successfulregistration');
        document.cookie = `user=${JSON.stringify(res.data)}; path=/`;
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
              <img src="/assets/hillbombcreations-logo.png" alt="hb logo" style={{ width: '280px' }} />
              <h2 style={{ width: '480px', fontSize: '24px'}}>Create Account</h2>
            </div>
            <Divider style={{ background: "#e8f0ff", marginBottom: '2vh'}} />
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', paddingX: '4vw', paddingY:'4vh' }} noValidate autoComplete="off">
            <TextField
                  label="Username"
                  sx={{ marginBottom: '2vh', width: '100%' }}
                  value={ this.state.username }
                  onChange={(e) =>  this.setState({ username: e.target.value })}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{
                      this.state.username.length > 8 ?
                      <CheckCircle style={{color: '#38B137'}} />
                      :
                      <ErrorOutline style={{color: '#FA3913'}} />
                    }</InputAdornment>,
                  }}
              />
            <TextField
                  label="Email"
                  sx={{ marginBottom: '2vh', width: '100%' }}
                  value={ this.state.email }
                  onChange={(e) =>  this.validateEmail(e)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{
                      this.state.validEmail ?
                      <CheckCircle style={{color: '#38B137'}} />
                      :
                      <ErrorOutline style={{color: '#FA3913'}} />
                    }</InputAdornment>,
                  }}
              />
              <TextField

                    label="First name"
                    sx={{ marginBottom: '2vh', width: '100%' }}
                    value={ this.state.firstName }
                    onChange={(e) =>  this.setState({ firstName: e.target.value })}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{
                        this.state.firstName ?
                        <CheckCircle style={{color: '#38B137'}} />
                        :
                        <ErrorOutline style={{color: '#FA3913'}} />
                      }</InputAdornment>,
                    }}
              />
              <TextField
                    label="Last name"
                    sx={{ marginBottom: '2vh', width: '100%' }}
                    value={ this.state.lastName }
                    onChange={(e) =>  this.setState({ lastName: e.target.value })}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{
                        this.state.lastName ?
                        <CheckCircle style={{color: '#38B137'}} />
                        :
                        <ErrorOutline style={{color: '#FA3913'}} />
                      }</InputAdornment>,
                    }}
              />
              <FormControl sx={{ width: '100%', marginBottom: '2vh' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    sx={{ width: '100%'}}
                    endAdornment={
                      <InputAdornment position="end">
                        <Tooltip title={
                          <div>
                            <span style={{ fontSize: '16px'}}>Password Must: </span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• be at least 8 characters</span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• contain a lowercase letter</span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• contain an uppercase letter</span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• contain a number</span>
                            <br />
                            <span style={{ fontSize: '16px'}}>• contain a special character</span>
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
                    label="Password"
                  />
              </FormControl>
              <FormControl sx={{ width: '100%', marginBottom: '2vh' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Verify Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    sx={{ width: '100%'}}
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
                        disabled={!(this.state.validPassword && (this.state.copyPassword === this.state.password)) || !this.state.firstName || !this.state.lastName || !this.state.email}
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
        <div style={{ position: 'absolute', bottom: '0' }}>
          <FooterComponent />
        </div>
      </div>
    );
  }
}