import { Component } from 'react';
import PropTypes from 'prop-types';
import MobileView from './mobile/index';
import DesktopView from './desktop/index';

export default class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.any,
  };
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }

  componentDidMount() {
    // set event listener so we can resize responsively
    window.addEventListener('resize', () => this.setState({ width: window.innerWidth }));
    return () => {
      window.removeEventListener('resize', () => this.setState({ width: window.innerWidth }));
    }
  }

  render() {
    const { user } = this.props;
  
    return this.state.width <= 768 ? 
      <MobileView user={user} />
      :
      <DesktopView user={user} />
  }
}