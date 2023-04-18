import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { AuthContextProvider } from './contexts/AuthContext';
import { PostContextProvider } from './contexts/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <PostContextProvider>
                <App />
            </PostContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
