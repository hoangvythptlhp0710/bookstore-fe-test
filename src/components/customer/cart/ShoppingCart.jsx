import React from "react";
import "./ShoppingCart.css"
import req, {be_url, userId} from "../../share";

export default class ShoppingCart extends React.Component {
    state = {
        outputCarts: [],
        total: 0
    }

    url = be_url + "cart/"

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
        req.get(this.url + userId).then((res) => {
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
        req.delete(this.url + userId + `/${id}`).then(res => {
            console.log(res);
            this.fetchProducts();
        });
    };

    handleIncrement = (outputCart) => {
        const productId = outputCart.productId;
        const quantity = outputCart.quantity + 1;
        this.handleClick(quantity, productId);
        this.updateState(quantity, productId)
    };

    handleDecrement = (outputCart) => {
        const productId = outputCart.productId;
        const quantity = outputCart.quantity - 1;
        if (quantity >= 0) {
            this.handleClick(quantity, productId);
            this.updateState(quantity, productId)
        }
    };

    updateState = (quantity, productId) => {
        let totalPrice = 0;
        let outputCarts = this.state.outputCarts
        outputCarts.map((item) => {
            if (item.productId === productId) {
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
    handleClick = (quantity, productId) => {
        req.put(this.url + userId + "/" + productId + "/" + quantity)
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
                                    <td>
                                        <div className='bar'>
                                            <button className='nBtn'
                                                    onClick={() => this.handleIncrement(outputCart)}>+
                                            </button>
                                            <span className='number'>{outputCart.quantity}</span>
                                            <button className='nBtn'
                                                    onClick={() => this.handleDecrement(outputCart)}>-
                                            </button>
                                        </div>
                                    </td>
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