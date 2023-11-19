/* eslint-disable react/no-unescaped-entities */
import { Component } from 'react';
import { Card, Button } from "@mui/material";
import FooterComponent from '../../universalComponents/footer';

export default class VerifyEmailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: window.innerWidth <= 768,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.setState({ mobile: window.innerWidth <= 768 }));
    return () => {
      window.removeEventListener('resize', () => this.setState({ mobile: window.innerWidth <= 768 }));
    }
  }

  render() {
    return (
      <div id="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', marginTop: '5vh' }}>
        <Card raised sx={{ bgcolor: '#fffff', paddingTop: '25px', paddingBottom: '25px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: this.state.mobile ? '85vw' : '25vw', alignItems: 'center', paddingRight: '15px', paddingLeft: '15px' }}>
            <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes" style={{ width: this.state.mobile ? '75vw' : '20vw', marginBottom: '15px' }} />
            <span>Congratulations!</span>
            <span>Your email address has been successfully verified, and your account is now fully activated.</span>
            <span style={{ marginTop: '15px' }}>
            Welcome to Sh4pes!
            </span>
            <Button
                  variant="contained"
                  onClick={() => window.location.replace('/')}
                  sx={{ width: '80%', bgcolor: '#3780FF', marginTop: '25px' }}
            >
                Back To Home
            </Button>
          </div>
        </Card>
        <div style={{ position: 'absolute', bottom: '0' }}>
          <FooterComponent />
        </div>
      </div>
    );
  }
}
