import { Component } from 'react';
import {
  Box,
  TextField,
  Button,
  LinearProgress,
  Card,
  Divider,
} from "@mui/material";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      loading: false,
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  openInNewTab = () => {
    window.open('https://www.sh4pesdevelopment.com/createUser', '_blank', 'noreferrer');
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    fetch('https://api.sh4pesdevelopment.com/api/user/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(res => {
      if (res.status === 200) {
        window.location.replace('/');
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2vh 2vw 2vh 2vw' }}>
        <img src="/assets/fullLogo.png" alt="Sh4pes" style={{ width: '150px', marginTop: '10vh' }} />
        <Box component="form" sx={{  display: 'flex', flexDirection: 'row', marginTop: '2vh' }} noValidate autoComplete="off">
        <div style={{ flexDirection: 'columm', width: '100%', paddingRight: '2vw', paddingLeft: '2vw' }}>
          <Card raised sx={{ bgcolor: '#fffff', paddingTop: '4vh', paddingBottom: '4vh'}}>
              <TextField
                  required
                  label="Email"
                  sx={{ marginBottom: '2vh', width: '80%' }}
                  value={ this.state.email }
                  onChange={this.handleInputChange}
              />
              <TextField
                  required
                  label="Password"
                  sx={{ marginBottom: '2vh', width: '80%' }}
                  value={ this.state.password }
                  onChange={this.handleInputChange}
              />
              {!this.state.loading ?
              <>
                  <Button
                    variant="contained"
                    onClick={this.onSubmit}
                    sx={{ marginBottom: '2vh', width: '80%' }}
                  >
                      Login
                  </Button>
              </>
              :
              <>
                  <LinearProgress
                      sx={{
                          color: '#5688e0',
                          width: '100%',
                      }}
                  />
              </>
              }
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', justifyContent: 'center' }}>
                <a href="http://localhost:5173/forgotPassword">Forgot Password?</a>
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
              <span style={{ marginRight: '10px', fontSize: '14px', color: '#333333' }}>© 2023 Hill Bomb Creations</span>
              <span id="contact"><a style={{ color: '#333333' }} href="mailto:hello@hbcreations.io">hello@hbcreations.io</a></span>
          </div>
      </div>
    );
  }
}