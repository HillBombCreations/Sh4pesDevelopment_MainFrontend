import React, { Component } from 'react';
import { Footer } from '../universalComponents';
import LoginForm from './loginForm';
import quickLinks from '../../utils/quickLinks';
const { openLocalSlug } = quickLinks();

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }
  componentDidMount() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c.includes('user=')) {
        const obj = c.replace('user=', '').trim();
        const userObj = JSON.parse(obj);
        if (userObj.token) {
          openLocalSlug('/');
        }
        this.setState({ displayName: `${userObj.firstName[0]}. ${userObj.lastName}` })
      }
    }
  }

  render() {
    const { mobile } = this.props;

    const linkHome = () => {
      openLocalSlug('/');
    }
    return (
      <div style={{ flexDirection: 'column', display: 'flex', height: '100%' }}>
        <div style={{ flex: '0 1 auto' }}>
          <div
            onClick={linkHome}
            style={{ color: 'black', display: 'flex', fontFamily: 'Bookman Old Style', marginLeft: '50px', marginTop: '20px', cursor: 'pointer' }}
          >
            <img alt='ggIcon' style={{ height: '45px', width: '60px' }} src={require('../../assets/ggIcon.png')} />
            <span style={{ marginLeft: '10px', fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto', fontSize: '15pt' }}>TONERS</span>
          </div>
        </div>
        <div style={{ flex: '1 1 auto', marginTop: '13vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '35pt', fontWeight: 'bold', textAlign: 'center', marginBottom: '3vh' }}>Login</div>
          <div style={{
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'center',
            border: '2px solid black',
            width: mobile ? '85vw' : '33vw',
            backgroundColor: mobile ? 'white' : null,
            height: '45vh',
            borderRadius: '10px'
          }}>
            <LoginForm />
          </div>
        </div>
        <div style={{ flex: '0 1 auto' }}>
          <Footer />
        </div>
        <div style={{
          width: mobile ? '10vw' : '4vw',
          position: 'absolute',
          top: 0,
          left: mobile ? '5vw' : '2vw',
          bottom: 0,
          background: 'linear-gradient(to right, #0D95F2 0%, #0D95F2 33%, #F80871 33%, #F80871 66%, #FFE001 66%, #FFE001 100%)',
          zIndex: -2
        }} />
      </div>
    )
  }
}
