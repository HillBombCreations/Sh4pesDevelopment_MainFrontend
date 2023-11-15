import { Component } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Card,
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
import PropTypes from 'prop-types';
import axios from 'axios';

export default class Register extends Component {
  static propTypes = {
    email: PropTypes.any,
  };
  constructor(props) {
    super(props)
    this.state = {
      id : '',
      email: this.props.email,
      password: '',
      copyPassword: '',
      loading: false,
      passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      validPassword: false,
      passwordColor: '#d32f2f'
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
      this.setState({ passwordColor: '#d32f2f'});
    }
  };
  onSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    this.setState({ loading: true });
    axios.post(
      `https://api.sh4pesdevelopment.com/api/user/resetPassword?email=${this.state.email}&password=${this.state.password}`,
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

  componentDidMount () {
    const { email } = this.props;
    this.setState({ email });
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '12vh'}}>
          <Card raised sx={{ bgcolor: '#fffff', width: '90vw' }}>
            <div style={{ paddingLeft: '2vw', paddingRight: '2vw', paddingTop: '2vh' }}>
              <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes" style={{ width: '300px' }} />
              <h2 style={{ width: '300px', fontSize: '24px'}}>Reset Password</h2>
            </div>
            <Box component="form" sx={{  display: 'flex', flexDirection: 'column', paddingX: '4vw', paddingY:'4vh' }} noValidate autoComplete="off">
              <FormControl sx={{ width: '100%', marginBottom: '2vh' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" sx={{ color: `${this.state.passwordColor}!important` }}>Password *</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    sx={{ width: '100%'}}
                    error={!this.state.validPassword}
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
                    label="Password *"
                  />
              </FormControl>
              <FormControl sx={{ width: '100%', marginBottom: '2vh' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" 
                    sx={{ 
                      color: (this.state.copyPassword !== this.state.password) || !this.state.validPassword || !this.state.copyPassword ? '#d32f2f !important' : '' }}>
                        Verify Password *
                  </InputLabel>
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
                        disabled={!(this.state.validPassword && (this.state.copyPassword === this.state.password))}
                        sx={{ width: '100%', bgcolor: '#3780FF' }}
                      >
                          Reset Password
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
            </Box>
        </Card>
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