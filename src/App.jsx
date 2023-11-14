// import { useState } from 'react'
import { Routes, Route, useLocation, useSearchParams } from "react-router-dom"
import { useEffect } from "react";
import './App.css';
import withAuth from "./universalComponents/wrappers/withAuth";
import withResetPasswordSession from "./universalComponents/wrappers/withResetPasswordSession";
import Dashboard from './pages/Dashboard/index';
import ResetPassword from './pages/ResetPassword/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import ForgotPassword from './pages/ForgotPassword/index';
import PageNotFound from './pages/PageNotFound/index';
import './App.css';
function App() {
    const { pathname, hash, key } = useLocation();
    const [queryParams] = useSearchParams();

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
                <Route path="/resetpassword" Component={withResetPasswordSession(ResetPassword, queryParams)} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default App
