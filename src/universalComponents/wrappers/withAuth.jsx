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
      // https://api.sh4pesdevelopment.com
      axios.get(
        'https://api.sh4pesdevelopment.com/api/user/checkToken',
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
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirectBool: true });
        });
    }
    render() {
      const { loading, redirectBool } = this.state;
      if (loading) {
        return null;
      }
      if (redirectBool) {
        window.location.replace('/login');
        return <CircularProgress />;
      }
      return <ComponentToProtect pathname={pathname} />;
    }
  }
}