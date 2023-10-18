// import { useState } from 'react'
import { Routes, Route, useLocation  } from "react-router-dom"
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LandingPage from './pages/LandingPage/index';
import ContactPage from './pages/ContactUs/index';
import Tabs from './universalComponents/Tabs/index';
import './App.css'

function App() {
    const { pathname } = useLocation();
    const [bgColor, setColor] = useState('red')
    useEffect(()=>{
        if (pathname === '/') setColor('red');
        if (pathname === '/contact') setColor('blue');
        //call your increment function here
    }, [pathname]);
    return (
        <div className="App">
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <img alt='HILL' style={{ height: '5vh', width: '7vw' }} src={'/assets/HBCreations.png'} />
                    </div>
                    <div>
                        <Tabs pathname={pathname} />
                    </div>
                </div>
                <div style={{ background: bgColor }}>
                    <AnimatePresence mode='wait'>
                        <Routes location={pathname} key={pathname}>
                            <Route path="/" element={ <LandingPage /> } />
                            <Route path="contact" element={ <ContactPage  /> } />
                        </Routes>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default App
