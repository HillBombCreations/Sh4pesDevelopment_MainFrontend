import { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch(`https://api.sh4pesdevelopment.com/api/user/forgotPassword?email=${this.state.email}`, {
      method: 'POST'
    })
    .then(res => {
      if (res.status === 201) {
        console.log('success')
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error requesting password reset, please try again later');
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Request Password Change</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}