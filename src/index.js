import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import First from './auth/First';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './scenes/Profile/UserProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <AuthProvider>
            <UserProvider>
            
            <App />
            </UserProvider>
            
        </AuthProvider>

    </BrowserRouter>
);



