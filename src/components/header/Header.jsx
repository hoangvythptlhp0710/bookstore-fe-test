import React, { Component } from 'react';
import './Header.css'
import { Link, useNavigate } from "react-router-dom";

class HeaderWithNavigate extends Component {
    url = "http://localhost:8080/search"

    state = {
        name: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    search = (event) => {
        event.preventDefault();
        this.props.navigate('/?name=' + this.state.name, { state: { name: this.state.name } })
    }

    baseLink = "http://localhost:3000/product/"
    render() {
        return (
            <nav bg='light' expand='lg'>
                <div className='top'>
                    <nav className='ml-auto'>
                        <a href='/login'>Login |</a>
                        <a href='/register'>Register</a>
                    </nav>
                </div>
                <div className='menu'>
                    <a href='/'><img src='/images/logo.png' alt='logo' className='logo'></img></a>
                    <div className='cats'>
                        <div class="dropdown">
                            <div class="dropbtn"><i class="bi bi-list"></i></div>
                            <div class="dropdown-content">
                                <a href={this.baseLink + "comic"}>Comic</a>
                                <a href={this.baseLink + "adventure"}>Adventure</a>
                                <a href={this.baseLink + "literature"}>Literature</a>
                                <a href={this.baseLink + "detective"}>Detective</a>
                                <a href={this.baseLink + "fiction"}>Fiction</a>
                                <a href={this.baseLink + "horror"}>Horror</a>
                            </div>
                        </div>
                        <a href={this.baseLink + "comic"}>Comic</a>
                        <a href={this.baseLink + "adventure"}>Adventure</a>
                        <a href={this.baseLink + "literature"}>Literature</a>
                        <a href={this.baseLink + "detective"}>Detective</a>
                    </div>
                    <form className='d-flex'>
                        <div className='d-flex'>
                            <input type='search' placeholder='Enter name of book' className='search mr-2'
                                id="name" onChange={this.handleChange} />
                            <button className='btn green-btn' onClick={this.search}>Search</button>
                        </div>
                    </form>
                    <a href='/#'><Link to={this.baseLink + "/cart/" + localStorage.getItem("userId")}><i class="bi bi-cart2"></i></Link></a>
                    <li className='account'><img src='/images/account.png' alt='account' className='account'></img>
                        <ul className='sub-account'>
                            <div><a href='/updateCustomer'>Update</a></div>
                            <div><a href='/deleteCustomer'>Delete</a></div>
                        </ul>
                    </li>
                </div>
                <hr></hr>
            </nav>
        );
    }
};

function Header(props) {
    let navigate = useNavigate();
    return <HeaderWithNavigate {...props} navigate={navigate} />
}

export default Header;