// import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react";
import LandingPage from './pages/LandingPage/index';
import './App.css'

function App() {
    const { pathname, hash, key } = useLocation();
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
                <Route path="/" element={ <LandingPage pathname={ pathname } /> } />
            </Routes>
        </div>
    )
}

export default App
