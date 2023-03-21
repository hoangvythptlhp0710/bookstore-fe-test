import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Footer from './components/footer/Footer';
import './components/footer/Footer.css';
import Header from './components/header/Header';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Header/>
            <App/>
        <Footer/>
    </StrictMode>
);

