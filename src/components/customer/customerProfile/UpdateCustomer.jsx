import React, {useEffect, useState} from 'react'

import {Button} from "react-bootstrap";
import req, {be_url, userId} from "../../others/Share";

export default function CustomerUpdate(props) {
    const [customer, setCustomer] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        age: "",
        avatar: ""
    })
    useEffect(() => {
        fetchCustomerList();
        console.log("listCustomer");
    })
    const {username, email, password, address, phone, age, avatar} = customer;
    const handleChange = (event) => {
        setCustomer({...customer, [event.target.id]: event.target.value})
        console.log(customer);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(customer);
        await req.put(`${be_url}customer/${userId}`, customer)
            .then((result) => {
                console.log(result);
                window.location = "/";
            })
    }

    let fetchCustomerList = async () => {
        await req.get(be_url + 'customer/' + userId).then((res) => {
            const customers = res.data;
            console.log(customers);
            setCustomer(customers);
            console.log(customer);
        })
    };

    return (

        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={(e) => {
                    submitForm(e)
                }}>
                    <h3>UPDATE CUSTOMER'S PROFILE</h3>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            id='username'
                            required
                            className="form-control"
                            value={username}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            id='email'
                            required
                            className="form-control"
                            value={email}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            id='password'
                            required
                            className="form-control"
                            value={password}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Address</label>
                        <input
                            type="text"
                            id='address'
                            className="form-control"
                            value={address}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Phone</label>
                        <input
                            type="tel"
                            id='phone'
                            className="form-control"
                            value={phone}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Age</label>
                        <input
                            type="number"
                            id='age'
                            className="form-control"
                            value={age}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Avatar</label>
                        <input
                            type="text"
                            id='avatar'
                            className="form-control"
                            value={avatar}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <Button type="submit" className="btn" variant="outline-dark">
                        Update the profile
                    </Button>
                </form>
            </div>
        </div>

    )
}