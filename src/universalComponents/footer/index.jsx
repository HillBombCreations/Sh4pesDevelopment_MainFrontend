import { Component } from 'react';

export default class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          year: new Date().getFullYear(),
        };
      }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#333333' }}>© { this.state.year } Hill Bomb Creations</span>
                <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '14px', color: '#333333' }}>|</span>
                <span id="contact">
                    <a style={{ color: '#333333', fontSize: '14px' }} href="mailto:hello@hbcreations.io">hello@hbcreations.io</a>
                </span>
            </div>
        );
    }
}
