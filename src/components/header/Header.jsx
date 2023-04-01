import React, {Component} from 'react';
import './Header.css'
import { useNavigate } from "react-router-dom";

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
        this.props.navigate('/?name='+this.state.name,{state:{name:this.state.name}})
    }

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
                        <a href='/#'>Comic book</a>
                        <a href='/#'>Adventure book</a>
                        <a href='/#'>Literature</a>
                        <a href='/#'>Detective book</a>
                    </div>
                    <form className='d-flex'>
                        <div className='d-flex'>
                            <input type='search' placeholder='Enter name of book' className='search mr-2'
                                   id="name" onChange={this.handleChange}/>
                            <button className='btn' onClick={this.search}>Search</button>
                        </div>
                    </form>
                    <a href='/#'><img src='/images/cart.png' alt='cart' className='cart'></img></a>
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