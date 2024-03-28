/* eslint-disable react/no-unescaped-entities */
import { Component } from 'react';
import {
  Card, Box, Divider, TextField,
  Button, LinearProgress
} from '@mui/material';
import axios from 'axios';
import cookieFns from '../../../utils/cookieFns';
import FooterComponent from '../../../universalComponents/footer';

const { serveCookie } = cookieFns();
const userObj = serveCookie('user');
let usableUserObj;
if (userObj) usableUserObj = JSON.parse(userObj);

export default class SuccessfulRegistrationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: window.innerWidth <= 768,
      code: '',
      email: '',
    };
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios.post(
      'https://api.hbcreations.io/api/user/verifyEmail',
      JSON.stringify({ 
            code: this.state.code,
            email: this.state.email,
      }),
      {
        headers: {
        'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      if (res.status === 200) {
        this.setState({ loading: false });
        window.location.replace('/login');
      } else {
        this.setState({ loading: false });
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      this.setState({ loading: false });
      alert('Error verifying code please try again');
    });
  }
  componentDidMount() { 
    this.setState({ email: usableUserObj?.email });
    window.addEventListener('resize', () => this.setState({ mobile: window.innerWidth <= 768 }));
    return () => {
      window.removeEventListener('resize', () => this.setState({ mobile: window.innerWidth <= 768 }));
    }
  }

  render() {
    return (
      <div id="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', marginTop: '5vh' }}>
        <Card raised sx={{ bgcolor: '#fffff', paddingTop: '25px', paddingBottom: '25px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: this.state.mobile ? '85vw' : '30vw', alignItems: 'center', paddingRight: '15px', paddingLeft: '15px' }}>
            <img src="/assets/hillbombcreations-logo.png" alt="hb logo" style={{ width: this.state.mobile ? '75vw' : '240px', marginBottom: '15px' }} />
            <strong>You need to verify your email!</strong>
            <span>Congratulations on successfully registering your account with us! We're thrilled to have you on board.</span>
            <span style={{ marginTop: '15px' }}>
              To ensure the security of your account and keep you informed about our latest updates, we need you to verify your email address.
            </span>
            <span style={{ marginBottom: '15px' }}>Please follow the simple steps below to complete the verification process:</span>
            <ul style={{ textAlign: 'left' }}>
              <li>
                <span>Open your email inbox associated with your registration.</span>
              </li>
              <li>
                <span>Look for an email from <strong>HB Creations</strong> with the subject line: "Your verification code"</span>
              </li>
              <li>
                <span>Get the authentication code and enter it below</span>
              </li>
            </ul>
            <span>Once you've completed these steps, your account will be fully activated, and you'll be ready to log in!</span>
          </div>
          <Divider style={{ background: "#e8f0ff", marginTop: '2vh'}} />
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', paddingX: '4vw', paddingY:'4vh' }} noValidate autoComplete="off">
              <TextField
                    label="Code"
                    sx={{ marginBottom: '2vh', width: '100%' }}
                    value={ this.state.code }
                    onChange={(e) =>  this.setState({ code: e.target.value })}
              />
                {
                    !this.state.loading ?
                    <>
                        <Button
                          variant="contained"
                          onClick={this.onSubmit}
                          disabled={!this.state.code }
                          sx={{ width: '100%', bgcolor: '#3780FF' }}
                        >
                            Verify Account
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
        <div style={{ position: 'absolute', bottom: '0' }}>
          <FooterComponent />
        </div>
      </div>
    );
  }
}
