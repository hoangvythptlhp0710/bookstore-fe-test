import React from 'react'
import {Button} from "react-bootstrap";
import req, {be_url, userId} from "../../share";

export default class UpdateCustomer extends React.Component {
    state = {
        customer: {}
    }

    componentDidMount() {
        this.fetchCustomer();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchCustomer();
    }

    fetchCustomer = () => {
        req.get(be_url).then((res) => {
            const customer = res.data;
            this.setState({customer});
        });
    };
    handleUpdate = (id) => {
        id.preventDefault();
        req.put(be_url + "customer/" + userId).then(res => {
            console.log("Update successfully" + res);
            if (res.status === 200) {
                window.location = "/";
            }
            this.fetchCustomer();
        })
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.handleUpdate}>
                        <h3>Update Customer</h3>
                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                id='username'
                                className="form-control"
                                placeholder="Update your username"
                                onChange={this.handleUpdate}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                id='email'
                                className="form-control"
                                placeholder="Update your email"
                                onChange={this.handleUpdate}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                id='password'
                                className="form-control"
                                placeholder="Update your password"
                                onChange={this.handleUpdate}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Address</label>
                            <input
                                type="text"
                                id='address'
                                className="form-control"
                                placeholder="Update your address"
                                onChange={this.handleUpdate}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Phone</label>
                            <input
                                type="number"
                                id='phone'
                                className="form-control"
                                placeholder="Update your phone"
                                onChange={this.handleUpdate}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Avatar</label>
                            <input
                                type="text"
                                id='avatar'
                                className="form-control"
                                placeholder="Update your avatar"
                                onChange={this.handleUpdate}
                            />
                        </div>
                        <div className="d-grid">
                            <Button type="submit" className="btn" variant="outline-dark">
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}