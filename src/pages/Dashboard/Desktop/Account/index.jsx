import { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Alert, ListItemText, Card, Button, LinearProgress
} from "@mui/material";

export default class AccountPage extends Component {
    static propTypes = {
      user: PropTypes.any,
    };
    constructor(props) {
      super(props)
      this.state = {
        loading: false,
        alertMessage: null,
        alertCode: null,
      };
    }
    render() {
        const { user } = this.props;

        const resetPasswordRequest = (event) => {
            event.preventDefault();
            this.setState({ loading: true });
            fetch(`https://api.sh4pesdevelopment.com/api/user/forgotPassword?email=${user.email}`, {
              method: 'POST'
            })
            .then(res => {
              if (res.status === 201) {
                this.setState({ loading: false, alertMessage: 'Successful Request! Please check your email for a link to reset your password.', alertCode: 201 });
              } else {
                this.setState({ loading: false });
                const error = new Error(res.error);
                throw error;
              }
            })
            .catch(err => {
              console.error(err);
              this.setState({ loading: false, alertMessage: 'Error requesting password reset, please double check your email and try again.', alertCode: 400 });
            });
        }
        return (
            <div id="page-container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <Card variant='outlined' sx={{ marginTop: '5vh', width: '40vw', backgroundColor: 'rgba(0,0,0,0.1)', padding: '10px 20px 10px 20px' }}>
                        <ListItemText style={{ textAlign: 'left' }} primary={user?.name} />
                        <ListItemText style={{ textAlign: 'left' }} secondary='Account Holder' />
                    </Card>
                    <Card variant='outlined' sx={{ marginTop: '2vh', width: '40vw', padding: '10px 20px 10px 20px' }}>
                        <ListItemText style={{ textAlign: 'left' }} primary='Contact Details' />
                        <ListItemText style={{ marginTop: '2vh', textAlign: 'left' }} primary={user.email} />
                        <ListItemText style={{ textAlign: 'left' }} secondary='Email' />
                    </Card>
                    <Card variant='outlined' sx={{ marginTop: '2vh', width: '40vw', padding: '10px 20px 10px 20px', textAlign: 'left' }}>
                        <ListItemText style={{ textAlign: 'left' }} primary='Password' />
                        {
                          !this.state.loading ?
                          <>
                            <Button
                              variant="contained"
                              onClick={resetPasswordRequest}
                              sx={{ marginTop: '2vh', bgcolor: '#3780FF' }}
                            >
                                Forgot Password
                            </Button>
                          </>
                          :
                          <>
                              <LinearProgress sx={{ color: '#3780FF' }} />
                          </>
                        }
                        { this.state.alertMessage ? 
                          <Alert severity={this.state.alertCode === 201 ? 'success' : 'error'} sx={{ marginTop: '15px' }}>
                            { this.state.alertMessage }
                          </Alert> 
                          : null
                        }
                    </Card>
                </div>
            </div>
        );
    }
};
