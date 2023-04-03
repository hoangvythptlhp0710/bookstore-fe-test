import React from "react";
import axios from 'axios';
import "./ShoppingCart.css"

export default class ShoppingCart extends React.Component {
    state = {
        outputCarts: [],
        total: 0
    }

    url = "http://localhost:8080/cart/"

    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reloadList !== prevProps.reloadList) {
            window.location.reload();
            this.fetchProducts();
        }
    }

    fetchProducts = () => {
        axios.get(this.url + localStorage.getItem("userId")).then((res) => {
            const outputCarts = res.data;
            let totalPrice = 0;
            outputCarts.forEach(product => {
                totalPrice += product.price * product.quantity;
            });
            this.setState({
                outputCarts: outputCarts,
                total: totalPrice
            });
        });
    };

    handleDelete = (id) => {
        axios.delete(this.url + localStorage.getItem("userId") + `/${id}`).then(res => {
            console.log(res);
            this.fetchProducts();
        });
    };

    handleIncrement = (outputCart) => {
        const itemId = outputCart.itemId;
        const quantity = outputCart.quantity + 1;
        this.handleClick(quantity, itemId);
        this.updateState(quantity, itemId)
    };

    handleDecrement = (outputCart) => {
        const itemId = outputCart.itemId;
        const quantity = outputCart.quantity - 1;
        this.handleClick(quantity, itemId);
        this.updateState(quantity, itemId)
    };

    updateState = (quantity, itemId) => {
        let totalPrice = 0;
        let outputCarts = this.state.outputCarts
        outputCarts.map((item) => {
            if(item.itemId === itemId) {
                item.quantity = quantity;
            }
            totalPrice += item.price * item.quantity;
            return quantity;
        })
        this.setState({
            outputCarts: outputCarts,
            total: totalPrice
        })
    }
    handleClick = (quantity, itemId) => {

        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
            'Content-Type': 'application/json'
        };
        axios.put("http://localhost:8080/cart/" + itemId + "/" + quantity, { headers })
            .then((res) => {

            })
            .catch(error => {
                this.setState({
                    statusCode: error.response.status,
                    errorMessage: error.message,
                })
            })
    };

    render() {
        return (
            <div className="container text-center mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th colSpan="5" className="h3">My shopping cart</th>
                        </tr>
                        <tr className="h5">
                            <th></th>
                            <th>Product name</th>
                            <th>Product price</th>
                            <th>Number</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.outputCarts
                                .map(outputCart =>
                                    <tr key={outputCart.productId}>
                                        <td><img src={outputCart.images[0]} alt="img"></img></td>
                                        <td> {outputCart.name} </td>
                                        <td> {outputCart.price} $</td>
                                        <td> <div className='bar'>
                                            <button className='nBtn' onClick={() => this.handleIncrement(outputCart)}>+</button>
                                            <span className='number'>{outputCart.quantity}</span>
                                            <button className='nBtn' onClick={() => this.handleDecrement(outputCart)}>-</button>
                                        </div> </td>
                                        <td>
                                            <button className="btn green-btn" onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this product?")) {
                                                    this.handleDelete(outputCart.productId);
                                                }
                                            }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
                <p>Total price: <strong>{this.state.total} $</strong></p>
                <button className='buyNow'>
                    Buy now
                </button>
            </div>
        )
    }
}