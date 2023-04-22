import React from "react";
import withRouter from "../products/WithRouter";
import "./Order.css"
import req, { be_url, fe_url, userId } from "../others/Share";

class CheckoutOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: JSON.parse(localStorage.getItem("items")),
            total: localStorage.getItem("total"),
            userInfo: {}
        }
    }

    componentDidMount() {
        this.fetchUserInfo();
    }

    fetchUserInfo = () => {
        req.get(be_url + "customer/" + userId)
            .then((res) => {
                this.setState({ userInfo: res.data })
            })
    }

    handleCheckout = () => {
        const dataToCheckout = {}
        const itemsToCheckout = []
        for(let i = 0; i < this.state.items.length; i++) {
            const item = {}
            item.productId = this.state.items[i].productId
            item.quantity = this.state.items[i].quantity
            itemsToCheckout[i] = item
        }
        dataToCheckout.items = itemsToCheckout
        if (this.state.paymentMethod) {
            dataToCheckout.paymentMethod = this.state.paymentMethod
        } else {
            dataToCheckout.paymentMethod = "cash"
        }
        dataToCheckout.customerName = this.state.userInfo.username
        dataToCheckout.phone = this.state.userInfo.phone
        dataToCheckout.messageOfCustomer = this.state.messageOfCustomer
        dataToCheckout.addressToReceive = this.state.addressToReceive
        dataToCheckout.voucherId = this.state.voucher

        req.post(be_url + "order/" + userId, dataToCheckout)
        .then(()=> {
            localStorage.removeItem("items")
            localStorage.removeItem("total")
            window.location.href = fe_url + "order?status=customer_confirmed"
        })
            .catch((error) => {
                console.log(error)
            })
    }

    handleSelectChange = (e) => {
        const paymentMethod = e.target.value
        this.setState({ paymentMethod: paymentMethod })
    }
    handleChange = (e) => {
        switch (e.target.name) {
            case "customerName":
                this.setState({ customerName: e.target.value });
                break
            case "phone":
                console.log(e.target.value)
                this.setState({ phone: e.target.value });
                break
            case "addressToReceive":
                this.setState({ addressToReceive: e.target.value });
                break
            case "messageOfCustomer":
                this.setState({ messageOfCustomer: e.target.value });
                break
            case "voucher":
                this.setState({ voucher: e.target.value });
                break
            default:
                throw new Error("error")
        }
    }
    render() {
        return (
            <div className="checkoutContainer">
                <div className="userInfo">
                    <h3>Checkout information</h3>
                    <input required name="customerName" placeholder="User name" defaultValue={this.state.userInfo.username} onChange={this.handleChange}></input><br></br>
                    <input required name="phone" placeholder="Phone number" defaultValue={this.state.userInfo.phone} onChange={this.handleChange}></input><br></br>
                    <input required name="addressToReceive" placeholder="Address to receive" defaultValue={this.state.userInfo.address} onChange={this.handleChange}></input><br></br>
                    <input required name="messageOfCustomer" placeholder="Message to shop" onChange={this.handleChange}></input>
                    <div>
                        <p>Payment method</p>
                        <select defaultValue="cash" onChange={this.handleSelectChange}>
                            <option value="cash">By cash</option>
                            <option value="online">Online</option>
                        </select>
                    </div>
                </div>
                <div className="productInfo">
                    {this.state.items.map(item => <div className="contentProductInfo" key={item.productId}>
                        <img src={item.images[0]} alt="product"></img>
                        <h4>{item.name}</h4>
                        <p>{item.price} $</p>
                        <p className="quantity_order">Quantity: {item.quantity}</p>
                    </div>)}
                    <div className="voucher">
                        <input placeholder="voucher code" name="voucher" onChange={this.handleChange}></input>
                        <button>Use</button>
                    </div>
                    <hr></hr>
                    <div>
                        <h5>Total: {this.state.total} $</h5>
                    </div>
                    <hr></hr>
                    <button onClick={this.handleCheckout}>Checkout</button>
                </div>
            </div>
        )
    }
}
export default withRouter(CheckoutOrder)