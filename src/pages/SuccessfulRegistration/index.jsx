import { Component } from 'react';

export default class SuccessfulRegistrationPage extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    return (
      <div id="page-container">
        Congrats! Please check your email for a verification link before you log in
      </div>
    );
  }
}
