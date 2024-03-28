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
  Alert,
  TextField,
  Divider,
} from "@mui/material";
import {
  Info,
  CheckCircle
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import axios from 'axios';
import cookieFns from '../../../../utils/cookieFns';
import FooterComponent from '../../../../universalComponents/footer';
const { serveCookie } = cookieFns();
const userObj = serveCookie('user');
let usableUserObj;
if (userObj) usableUserObj = JSON.parse(userObj);

export default class DesktopResetPassword extends Component {
  static propTypes = {
    email: PropTypes.any,
  };
  
  constructor(props) {
    super(props)
    this.state = {
      id : '',
      code: '',
      password: '',
      copyPassword: '',
      loading: false,
      passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      validPassword: false,
      passwordColor: '#d32f2f',
      eatCookie: null,
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
    event.preventDefault();
    this.setState({ loading: true });
    axios.post(
      `https://api.hbcreations.io/api/user/resetPassword?username=${usableUserObj?.username}&password=${this.state.password}&email=${usableUserObj?.email}&code=${this.state.code}`,
      { headers: { 'Content-Type': 'application/json' } }
    ).then(res => {
      if (res.status === 200) {
        this.setState({ loading: false });
        const { eatCookie } = cookieFns();
        eatCookie();
        window.location.replace('/login');
      } else {
        this.setState({ loading: false, accountError: 'error' });
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      this.setState({ loading: false, accountError: 'error' });
    });
  }

  componentDidMount () {
    const { email } = this.props;
    this.setState({ email });
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingRight: '15vw', paddingLeft: '15vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8vh', alignItems: 'center'}}>
          <Card raised sx={{ bgcolor: '#fffff'}}>
            <div style={{ paddingLeft: '2vw', paddingRight: '2vw', paddingTop: '2vh' }}>
              <img src="/assets/hillbombcreations-logo.png" alt="hb logo" style={{ width: '240px' }} />
              <h2 style={{ width: '480px', fontSize: '24px'}}>Reset Password</h2>
            </div>
            <Divider style={{ background: "#e8f0ff", marginBottom: '2vh'}} />
              { this.state.accountError === 'error' ? 
                  <Alert severity="error"  sx={{ width: '20vw', marginBottom: '2vh' }}>
                    An error has occured please try again
                  </Alert> 
                :
                null

              }
            <Box component="form" sx={{  display: 'flex', flexDirection: 'column', paddingX: '4vw', paddingY:'4vh' }} noValidate autoComplete="off">
              <TextField
                    label="Code"
                    sx={{ marginBottom: '2vh', width: '100%' }}
                    value={ this.state.code }
                    onChange={(e) =>  this.setState({ code: e.target.value })}
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
                  <InputLabel htmlFor="outlined-adornment-password"> Verify Password </InputLabel>
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
                    label="Verify Password"
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
          <FooterComponent />
        </div>
      </div>
    );
  }
}