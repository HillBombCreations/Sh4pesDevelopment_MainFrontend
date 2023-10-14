import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import LandingPage from './components/LandingPage';
import LoadingSplash from './components/LoadingSplashPage';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import quickLinks from './utils/quickLinks';
const { openLocalSlug } = quickLinks();
import './App.css'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            mobile: false,
            currentTab: 0,
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ mobile: window.innerWidth <= 640 });
        this.setState({ loading: false });
    }
    render() {
        const updateCurrentTab = (tabIndex) => {
            this.setState({ currentTab: tabIndex });
        }
        return (
            <div className='App'>
                {/* Graphics */}
                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                    {
                    this.state.currentTab === 0 && !this.state.mobile && !this.state.loading ?
                    <img alt='ggIcon' style={{ height: '80vh', width: '32vw' }} src={'/assets/swirl.png'} />
                    : null
                    }
                </div>
                {/* Routes */}
                <Router>
                    <Routes>
                        <Route exact path='/' element={
                        this.state.loading ?
                        <LoadingSplash />
                        :
                        <LandingPage mobile={this.state.mobile} currentTab={this.state.mobile ? 0 : this.state.currentTab} updateCurrentTab={updateCurrentTab} />
                        } />
                        <Route exact path='aboutUs' element={
                        this.state.loading ?
                        <LoadingSplash />
                        :
                        <AboutUs mobile={this.state.mobile} currentTab={this.state.mobile ? 0 : this.state.currentTab} updateCurrentTab={updateCurrentTab} />
                        } />
                        <Route exact path='services' element={
                        this.state.loading ?
                        <LoadingSplash />
                        :
                        <Services mobile={this.state.mobile} currentTab={this.state.mobile ? 0 : this.state.currentTab} updateCurrentTab={updateCurrentTab} />
                        } />
                        <Route exact path='portfolio' element={
                        this.state.loading ?
                        <LoadingSplash />
                        :
                        <Portfolio mobile={this.state.mobile} currentTab={this.state.mobile ? 0 : this.state.currentTab} updateCurrentTab={updateCurrentTab} />
                        } />
                        <Route exact path='contactUs' element={
                        this.state.loading ?
                        <LoadingSplash />
                        :
                        <ContactUs mobile={this.state.mobile} currentTab={this.state.mobile ? 0 : this.state.currentTab} updateCurrentTab={updateCurrentTab} />
                        } />
                    </Routes>
                </Router>
            </div>
        );
    }
}
