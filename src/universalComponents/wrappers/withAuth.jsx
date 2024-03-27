import { Component } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import MobileView from './navigation/mobile';
import DesktopView from './navigation/desktop';

export default function withAuth(ComponentToProtect, pathname) {
  return class WithAuth extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirectBool: false,
        width: window.innerWidth
      };
    }

    componentDidMount() {
      // check users token, and send that boi to login if they aint got it like that
      axios.get(
        'https://api.hbcreations.io/api/user/checkToken',
        {
          withCredentials: true,
        }
      ).then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }).catch(err => {
        console.error(err);
        // UPDATE: this.setState({ loading: false, redirectBool: true });
        this.setState({ loading: false });
      });

      // set event listener so we can resize responsively
      window.addEventListener('resize', () => this.setState({ width: window.innerWidth }));
      return () => {
        window.removeEventListener('resize', () => this.setState({ width: window.innerWidth }));
      }
    }

    render() {
      const { loading, redirectBool } = this.state;
      if (loading) {
        return null;
      }
      if (redirectBool) {
        // UPDATE: window.location.replace('/login');
        return <CircularProgress />;
      }

      return this.state.width <= 768 ? 
        <MobileView pathname={pathname} ChildComponent={ComponentToProtect} />
        :
        <DesktopView pathname={pathname} ChildComponent={ComponentToProtect} />
    }
  }
}