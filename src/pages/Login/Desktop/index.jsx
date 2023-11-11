import { Component } from 'react';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40vh', paddingRight: '15vw'}}>
          <img src="/assets/fullLogo.png" alt="Sh4pes" style={{ width: '320px' }} />
          <p style={{ width: '480px', fontSize: '24px'}}>Empower your online presence and streamline finances effortlessly with HB creations</p>
        </div>
        <Box component="form" sx={{  display: 'flex', flexDirection: 'row', marginTop: '35vh' }} noValidate autoComplete="off">
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
                  <CircularProgress
                      size={24}
                      sx={{
                      color: '#5688e0',
                      }}
                  />
              </>
              }
              <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '2vh', justifyContent: 'center' }}>
                <a href="http://localhost:5173/forgotPassword">Forgot Password?</a>
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
      //   <form onSubmit={this.onSubmit}>
      //     <input
      //       type="email"
      //       name="email"
      //       placeholder="Enter email"
      //       value={this.state.email}
      //       onChange={this.handleInputChange}
      //       required
      //     />
      //     <input
      //       type="password"
      //       name="password"
      //       placeholder="Enter password"
      //       value={this.state.password}
      //       onChange={this.handleInputChange}
      //       required
      //     />
      //     <input type="submit" value="Submit"/>
      //   </form>
      // </div>
    );
  }
}