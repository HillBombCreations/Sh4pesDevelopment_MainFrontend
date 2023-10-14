import React, { Component, createRef } from 'react';
import { Footer, Tabs } from '../universalComponents';

export default class MainContent extends Component {
    constructor(props) {
      super(props);
      this.infoGraphic = createRef()  
      this.props = props;
      this.state = {
        search: ''
      };
    }

    render() {
      const { currentTab, mobile } = this.props;

      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Navigation */}
          <div style={{ flex: '0 1 auto' }}>
            <Tabs currentTab={currentTab} mobile={mobile} />
          </div>
          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '1 1 auto' }}>
            <div style={{ marginTop: '10vh', fontSize: mobile ? '30pt' : '45pt', fontWeight: 'bold', marginLeft: mobile ? '17vw' : '8vw' }}>
              GGs
            </div>
            <div style={{ marginTop: '2vh', fontSize: mobile ? '30pt' : '45pt', fontWeight: 'bold', marginLeft: mobile ? '17vw' : '8vw' }}>
              ADMIN PORTAL
            </div>
          </div>
          {/* Footer */}
          <div style={{ flex: '0 1 auto' }}><Footer /></div>
          {/* Graphics */}
          <div style={{
            width: mobile ? '10vw' : '4vw',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: mobile ? '5vw' : '2vw',
            background: 'linear-gradient(to right, #0D95F2 0%, #0D95F2 33%, #F80871 33%, #F80871 66%, #FFE001 66%, #FFE001 100%)',
            zIndex: -2
          }} />
        </div>
      )
    }
}
