// import { useState } from 'react'
import ReactGA from 'react-ga';
import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import LandingPage from './pages/LandingPage/index';
import './App.css'

ReactGA.initialize('G-PDC9TXR6Q2');

function App() {
    const { pathname, hash, key } = useLocation();
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const isMobile = width <= 768;
    useEffect(() => {
        // if not a hash link, scroll to top
        if (hash === '') {
          window.scrollTo(0, 0);
        }
        // else scroll to id
        else {
          setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView();
            }
          }, 0);
        }
    }, [pathname, hash, key]);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ <LandingPage pathname={ pathname } isMobile = { isMobile } /> } />
            </Routes>
        </div>
    )
}

export default App
