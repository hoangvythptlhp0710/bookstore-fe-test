import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import './Auth.css';

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    url = "http://localhost:8080/login"

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        event.target.reset();
        this.setState({
            username: '',
            password: ''
        })
        const Account = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(this.url, Account, {withCredentials: true})
            .then(res => {
                console.log("Received token: " + res.data);
                if (res.status === 200) {
                    window.location = "/";
                }
            })
    }

    render() {
        return (

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Login</h3>
                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                id='username'
                                className="form-control"
                                placeholder="Enter username"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                id='password'
                                className="form-control"
                                placeholder="Enter password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="d-grid">
                            <Button type="submit" className="btn" variant="outline-dark">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}