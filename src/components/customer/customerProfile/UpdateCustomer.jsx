import React, {useEffect, useState} from 'react'

import {Button} from "react-bootstrap";
import req, {be_url, role, userId} from "../../others/Share";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import NotFound from "../../others/NotFound";

export default function CustomerUpdate() {
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
        fetchCustomer()
        console.log("Fetch customer.")
    }, [])

    const {username, email, password, address, phone, age, avatar} = customer;

    const handleChange = (event) => {
        setCustomer({...customer, [event.target.id]: event.target.value})
        console.log("Change")
    }

    const submitForm = async (e) => {
        e.preventDefault();
        console.log("Submit form!");
        await req.put(`${be_url}customer/${userId}`, customer)
            .then((res) => {
                console.log("Submit!")
                window.location = "/";
            })
    }

    let fetchCustomer = async () => {
        await req.get(be_url + 'customer/' + userId).then((res) => {
            const customer = res.data;
            setCustomer(customer);
        })
    };

    if (role === "ROLE_CUSTOMER") {
        return (<>
                <Header/>
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
                                    placeholder="Enter old password"
                                    value={password}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>New Password</label>
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
                <Footer/>
            </>

        )
    } else {
        return (
            <>
                <Header/>
                <NotFound title='(╥﹏╥) Access denied!' details='You have no permission to access this page!'/>
                <Footer/>
            </>
        )
    }
}