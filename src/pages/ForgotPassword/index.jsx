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
import { CheckCircle } from '@mui/icons-material';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailRegex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      validEmail: false,
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
    fetch(`https://api.sh4pesdevelopment.com/api/user/forgotPassword?email=${this.state.email}`, {
      method: 'POST'
    })
    .then(res => {
      if (res.status === 201) {
        this.setState({ loading: false, alertMessage: 'Successful Request! Please check your email for a link to reset your password.', alertCode: 201 });
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
            <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes" style={{ width: this.state.mobile ? '75vw' : '20vw' }} />
            <h2 style={{ width: this.state.mobile ? '75vw' : '20vw', fontSize: '24px'}}>Request Password Change</h2>
          </div>
          <Divider style={{ background: "#e8f0ff", marginBottom: '2vh'}} />
          <Box component="form" sx={{  display: 'flex', flexDirection: 'column', paddingX: '4vw', paddingY:'4vh', alignItems: 'center' }} noValidate autoComplete="off">
            <TextField
              required
              label="Enter email"
              error={!this.state.validEmail}
              sx={{ marginBottom: '2vh', width: this.state.mobile ? '80vw' : '25vw' }}
              value={ this.state.email }
              onChange={this.validateEmail}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {
                    this.state.validEmail ?
                    <CheckCircle style={{color: '#38B137'}} />
                    : null
                  }
                </InputAdornment>,
              }}
            />
            {
              !this.state.loading ?
              <>
                <Button variant="contained" onClick={this.onSubmit} disabled={!this.state.validEmail} sx={{ width: this.state.mobile ? '80vw' : '100%', bgcolor: '#3780FF' }}>
                  Request Password Change
                </Button>
              </>
              :
              <>
                  <LinearProgress sx={{ color: '#3780FF', marginX: '2.5vw' }} />
              </>
            }
            { this.state.alertMessage ? 
              <Alert severity={this.state.alertCode === 201 ? 'success' : 'error'} sx={{ marginTop: '15px', width: '73vw' }}>
                { this.state.alertMessage }
              </Alert> 
              : null
            }
          </Box>
        </Card>
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