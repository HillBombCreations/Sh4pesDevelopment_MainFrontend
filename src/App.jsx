import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';

import withAuth from './universalComponents/wrappers/withAuth';
import withResetPasswordSession from './universalComponents/wrappers/withResetPasswordSession';
import withVerifyEmail from './universalComponents/wrappers/withVerifyEmail';

// authed pages
import Dashboard from './pages/loggedIn/Dashboard/index';
import Products from './pages/loggedIn/Products/index';
import Account from './pages/loggedIn/Account/index';
import Billing from './pages/loggedIn/Billing/index';
import Support from './pages/loggedIn/Support/index';
// non authed pages
import ResetPassword from './pages/notLoggedIn/ResetPassword/index';
import VerifyEmail from './pages/notLoggedIn/VerifyEmail/index';
import Login from './pages/notLoggedIn/Login/index';
import Register from './pages/notLoggedIn/Register/index';
import SuccessfulRegistration from './pages/notLoggedIn/SuccessfulRegistration/index';
import ForgotPassword from './pages/notLoggedIn/ForgotPassword/index';
import PageNotFound from './pages/notLoggedIn/PageNotFound/index';

function App() {
    const { pathname } = useLocation();

    return (
        <div className="App">
            <Routes>
                {/* authed pages */}
                <Route path="/" Component={withAuth(Dashboard, pathname)} />
                <Route path="/products" Component={withAuth(Products, pathname)} />
                <Route path="/account" Component={withAuth(Account, pathname)} />
                <Route path="/billing" Component={withAuth(Billing, pathname)} />
                <Route path="/support" Component={withAuth(Support, pathname)} />
                {/* non authed pages */}
                <Route exact path="/verifyemail/:id" Component={withVerifyEmail(VerifyEmail, pathname)} />
                <Route path="/resetpassword/:id/:email" Component={withResetPasswordSession(ResetPassword, pathname)} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/successfulregistration" element={<SuccessfulRegistration />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default App
