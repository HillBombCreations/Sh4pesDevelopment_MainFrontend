import React, { Component, createRef } from 'react';

export default class MainContent extends Component {
    constructor(props) {
      super(props);
      this.infoGraphic = createRef()  
      this.props = props;
      this.state = {};
    }

    render() {
      return (
        <div>
          Welcome
        </div>
      )
    }
}
