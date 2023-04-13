import React, {Component} from 'react';
import './Header.css'
import {Link, useNavigate} from "react-router-dom";
import {accessToken, be_url, fe_url, role} from '../others/Share';
import axios from "axios";

class HeaderWithNavigate extends Component {
    url = be_url + "search"

    state = {
        name: ""
    }
    baseLink = fe_url + "book/"

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    search = (event) => {
        event.preventDefault();
        this.props.navigate(`/?name=${this.state.name}`, {state: {name: this.state.name}})
    }

    logout = () => {
        axios.post(`${be_url}logout`).then((res) => {
            if (res.status === 200) {
                localStorage.clear()
                this.setState({
                    accessToken: null
                })
                window.location = "/"
            }
        })
    }

    render() {
        return (
            <nav>
                <div className='top'>
                    {!accessToken ?
                        <nav className='ml-auto'>
                            <a href='/login'>Login |</a>
                            <a href='/register'>Register</a>
                        </nav>
                        : <nav className='ml-auto'>
                            <a href='/#' onClick={this.logout}>Logout |</a>
                            <a href='/login'>Re-login |</a>
                            <a href='/register'>Re-register</a>
                        </nav>
                    }
                </div>
                <div className='menu'>
                    <a href='/'><img src='/images/icon.jpg' alt='logo' className='logo mt-1'></img></a>
                    <div className='cats'>
                        <div className="dropdown">
                            <div className="drop-btn"><i className="bi bi-list"></i></div>
                            <div className="dropdown-content">
                                <a href={this.baseLink + "fiction/0"}>Fiction</a>
                                <a href={this.baseLink + "horror/0"}>Horror</a>
                            </div>
                        </div>
                        <a href={this.baseLink + "comic/0"}>Comic</a>
                        <a href={this.baseLink + "adventure/0"}>Adventure</a>
                        <a href={this.baseLink + "literature/0"}>Literature</a>
                        <a href={this.baseLink + "detective/0"}>Detective</a>
                        {role === "ROLE_ADMIN" && <a href={fe_url + 'admin'}>Manage product</a>}
                    </div>
                    <form className='d-flex'>
                        <div className='d-flex'>
                            <input type='search' placeholder='Enter name of book' className='search mr-2'
                                   id="name" onChange={this.handleChange}/>
                            <button className='btn green-btn' onClick={this.search}>Search</button>
                        </div>
                    </form>
                    {role === "ROLE_CUSTOMER" &&
                        <>
                            <a href='/#'><Link to={fe_url + "cart"}><i className="bi bi-cart2"></i></Link></a>
                            <li className='account'><img src='/images/account.png' alt='account' className='account'></img>
                                <ul className='sub-account'>
                                    <div><a href='/customer/:id'>Update</a></div>
                                </ul>
                            </li>
                        </>}
                </div>
                <hr></hr>
            </nav>
        );
    }
}

function Header(props) {
    let navigate = useNavigate();
    return <HeaderWithNavigate {...props} navigate={navigate}/>
}

export default Header;