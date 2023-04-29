import React from "react";
import "../others/backup/Admin.css";
import req, {be_url, role} from "../others/Share";
import NotFound from "../others/NotFound";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default class VoucherAdd extends React.Component {
    state = {
        title: '',
        customerId: 0,
        rate: 0,
        dueDate: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.target.reset();
        this.setState({
            title: '',
            customerId: 0,
            rate: 0,
            dueDate: ''
        })

        const voucher = {
            title: this.state.title,
            customerId: this.state.customerId,
            rate: this.state.rate,
            dueDate: this.state.dueDate
        }

        req.post(be_url + 'admin/voucher', voucher)
            .then((res) => {
                if (res.status === 200) {
                    window.location = "/admin/vouchers";
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        if (role === "ROLE_ADMIN") {
            return (
                <div className="container text-center mt-3 mb-5">
                    <h3 className=" text-primary- p-2 ">
                        ADD NEW VOUCHER
                    </h3>
                    <form className="form add card p-3 " onSubmit={this.handleSubmit}>
                        <label className="h6 guide">Title</label>
                        <input type="text" className="form-control enter" id="title" value={this.state.title} required
                               onChange={this.handleChange}/>

                        <label className="h6 guide">Customer ID</label>
                        <input type="number" className="form-control enter" id="customerId"
                               value={this.state.customerId} required
                               onChange={this.handleChange}/>

                        <label className="h6 guide">Rate</label>
                        <input type="number" className="form-control enter" id="rate" value={this.state.rate} required
                               onChange={this.handleChange}/>


                        <label className="h6 guide">Due Date</label>
                        <input type="date" className="form-control enter" id="dueDate" value={this.state.dueDate}
                               required
                               onChange={this.handleChange}/>

                        <div className="btnSubmit">
                            <button type="submit" className="btn btn-primary  bg-success">Add Voucher</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <>
                    <Header/>
                    <NotFound title='(╥﹏╥) Access denied!' details='You have no permission to access this page!'/>
                    <Footer/>
                </>)
        }
    }
}