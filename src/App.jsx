// import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react";
import './App.css';

import withAuth from "./universalComponents/wrappers/withAuth";
import withResetPasswordSession from "./universalComponents/wrappers/withResetPasswordSession";
import withVerifyEmail from "./universalComponents/wrappers/withVerifyEmail";

import Dashboard from './pages/Dashboard/index';
import ResetPassword from './pages/ResetPassword/index';
import VerifyEmail from './pages/VerifyEmail/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import SuccessfulRegistration from './pages/SuccessfulRegistration/index';
import ForgotPassword from './pages/ForgotPassword/index';
import PageNotFound from './pages/PageNotFound/index';
import './App.css';

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
                <Route path="/" Component={withAuth(Dashboard, pathname)} />
                <Route exact path="/verifyemail/:id" Component={withVerifyEmail(VerifyEmail, pathname)} />
                <Route path="/resetpassword/:id/:email" Component={withResetPasswordSession(ResetPassword, pathname)} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/successfulregistration" element={<SuccessfulRegistration />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default App
