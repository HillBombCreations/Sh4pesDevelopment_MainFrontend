/* eslint-disable react/no-unescaped-entities */
import { Component } from 'react';
import { Card } from "@mui/material";
import FooterComponent from '../../universalComponents/footer';

export default class SuccessfulRegistrationPage extends Component {
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
          <div style={{ display: 'flex', flexDirection: 'column', width: this.state.mobile ? '85vw' : '30vw', alignItems: 'center', paddingRight: '15px', paddingLeft: '15px' }}>
            <img src="/assets/sh4pes_blue-bg_with-logo.png" alt="Sh4pes" style={{ width: this.state.mobile ? '75vw' : '20vw', marginBottom: '15px' }} />
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
                <span>Look for an email from <strong>HB Creations</strong> with the subject line: "Verify your email"</span>
              </li>
              <li>
                <span>Click on the verification link provided in the email.</span>
              </li>
            </ul>
            <span>Once you've completed these steps, your account will be fully activated, and you'll be ready to log in!</span>
          </div>
        </Card>
        <div style={{ position: 'absolute', bottom: '0' }}>
          <FooterComponent />
        </div>
      </div>
    );
  }
}
