import { Component } from 'react';

export default class FooterComponent extends Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#333333' }}>© 2023 Hill Bomb Creations</span>
                <span style={{ marginLeft: '10px', marginRight: '10px', fontSize: '14px', color: '#333333' }}>|</span>
                <span id="contact">
                    <a style={{ color: '#333333', fontSize: '14px' }} href="mailto:hello@hbcreations.io">hello@hbcreations.io</a>
                </span>
            </div>
        );
    }
}
