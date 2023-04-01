import React from 'react';
import './Header.css'

const Header = () => {
    return (
        <nav bg='light' expand='lg'>
            <div className='top'>
                <nav className='ml-auto'>
                    <a href='/login'>Login |</a>
                    <a href='/register'>Register</a>
                </nav>
            </div>
            <div className='menu'>
                <div href='/'><img src='./images/logo.png' alt='logo' className='logo'></img></div>
                <div className='cats'>
                    <a href='/#'>Comic book</a>
                    <a href='/#'>Adventure book</a>
                    <a href='/#'>Literature</a>
                    <a href='/#'>Detective book</a>
                </div>
                <form className='d-flex'>
                    <div className='d-flex'>
                        <input type='text' placeholder='Search' className='search mr-2'/>
                        <button className='btn'>Search</button>
                    </div>
                </form>
                <a href='/#'><img src='./images/cart.png' alt='cart' className='cart'></img></a>
            </div>
            <hr></hr>
        </nav>
    );
};

export default Header;
