import { Component } from 'react';
import { CircularProgress } from '@mui/material';

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
      fetch('http://localhost:5000/api/user/checkToken', { credentials: 'same-origin' })
        .then(res => {
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