// import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react";
import LandingPage from './pages/LandingPage/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
// import PageNotFound from './pages/PageNotFound/index';
import './App.css';
import withAuth from "./universalComponents/wrappers/withAuth";

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
                <Route path="/" Component={withAuth(LandingPage, pathname)} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path='*' element={<PageNotFound />} /> */}
            </Routes>
        </div>
    )
}

export default App
