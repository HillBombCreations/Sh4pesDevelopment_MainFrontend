import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import './App.css'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        return (
            <div className='App'>
                {/* Routes */}
                <Router>
                    <Routes>
                        <Route exact path='/' element={
                            <LandingPage />
                        } />
                    </Routes>
                </Router>
            </div>
        );
    }
}
