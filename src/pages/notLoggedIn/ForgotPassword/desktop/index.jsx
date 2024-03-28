import { Component } from 'react';
import {
  Box,
  TextField,
  Button,
  LinearProgress,
  Card,
  InputAdornment,
  Divider,
  Alert,
} from "@mui/material";
import axios from 'axios';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import FooterComponent from '../../../../universalComponents/footer';

export default class DesktopForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      loading: false,
      alertMessage: null,
      alertCode: null,
      mobile: window.innerWidth <= 768
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setState({ mobile: window.innerWidth <= 768 }));
    return () => {
      window.removeEventListener('resize', () => this.setState({ mobile: window.innerWidth <= 768 }));
    }
  }
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
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios.post(`https://api.hbcreations.io/api/user/requestPasswordReset?username=${this.state.username}`)
    .then(res => {
      console.log(res);
      if (res.status === 200) {
        document.cookie = `user=${JSON.stringify(res.data)}; path=/`;
        this.setState({ loading: false, alertMessage: 'Successful Request! Please check your email for a link to reset your password.', alertCode: 201 });
        setTimeout(() => {
          window.location.replace('https://portal.hbcreations.io/resetpassword');
        }, 3000)
      } else {
        this.setState({ loading: false });
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      this.setState({ loading: false, alertMessage: 'Error requesting password reset, please double check your email and try again.', alertCode: 400 });
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card raised sx={{ bgcolor: '#fffff', marginTop: '5vh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '2vw', paddingRight: '2vw', paddingTop: '2vh' }}>
            <img src="/assets/hillbombcreations-logo.png" alt="hb logo" style={{ width: this.state.mobile ? '75vw' : '260px' }} />
            <h2 style={{ width: this.state.mobile ? '75vw' : '20vw', fontSize: '24px'}}>Request Password Change</h2>
          </div>
          <Divider style={{ background: "#e8f0ff", marginBottom: '2vh'}} />
          <Box component="form" sx={{  display: 'flex', flexDirection: 'column', paddingX: '4vw', paddingY:'4vh', alignItems: 'center' }} noValidate autoComplete="off">
            <TextField
              label="Enter username"
              sx={{ marginBottom: '2vh', width: this.state.mobile ? '80vw' : '25vw' }}
              value={ this.state.username }
              onChange={(e) =>  this.setState({ username: e.target.value })}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {
                    this.state.username ?
                    <CheckCircle style={{color: '#38B137'}} />
                    : <ErrorOutline style={{color: '#FA3913'}} />
                  }
                </InputAdornment>,
              }}
            />
            {
              !this.state.loading ?
              <>
                <Button variant="contained" onClick={this.onSubmit} disabled={!this.state.username} sx={{ width: this.state.mobile ? '80vw' : '100%', bgcolor: '#3780FF' }}>
                  Request Password Change
                </Button>
              </>
              :
              <>
                  <LinearProgress sx={{ color: '#3780FF', marginX: '2.5vw' }} />
              </>
            }
            { this.state.alertMessage ? 
              <Alert severity={this.state.alertCode === 201 ? 'success' : 'error'} sx={{ marginTop: '15px', width: '20vw' }}>
                { this.state.alertMessage }
              </Alert> 
              : null
            }
          </Box>
        </Card>
        <div style={{ position: 'absolute', bottom: '0' }}>
          <FooterComponent />
        </div>
      </div>
    );
  }
}