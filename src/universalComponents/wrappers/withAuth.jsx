import { Component } from 'react';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

export default function withAuth(ComponentToProtect, pathname) {
  return class WithAuth extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirectBool: false,
      };
    }
    componentDidMount() {
      console.log('DOCUMENT', document.cookie);
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
      return <ComponentToProtect pathname={pathname} />;
    }
  }
}