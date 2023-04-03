import axios from 'axios';
import React from 'react';
import withRouter from './withRouter';
import "./product.css";
import { Link } from 'react-router-dom';

class ProductDetails extends React.Component {
    state = {
        outputCart: {},
        count: 1,
        statusCode: 0,
        errorMessage:''
    }

    componentDidMount() {
        const id = this.props.params.id;
        this.fetchProduct(id);
    }

    handleIncrement = () => {
        this.setState({ count: this.state.count + 1 });
    };

    handleDecrement = () => {
        if (this.state.count > 0) {
            this.setState({ count: this.state.count - 1 });
        }
    };
    handleClick = () => {
        const headers = {
            'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
            'Content-Type': 'application/json'
        };
        const data = {};
        data.productId = this.state.productId;
        data.quantity = this.state.count;
        axios.post("http://localhost:8080/cart/"+ localStorage.getItem("userId"), JSON.stringify(data), {headers})
        .then((res) => {
        })
        .catch(error => {
            this.setState({
                statusCode: error.response.status,
                errorMessage: error.message,
            })
        })
    };

    fetchProduct(id) {
        axios.get("http://localhost:8080/product/" + id)
            .then((res) => {
                const pProductId = res.data.id;
                const pName = res.data.name
                const pPrice = res.data.price
                const pDescription = res.data.description
                const pInStock = res.data.inStock
                const pImages = res.data.images
                this.setState({
                    productId: pProductId,
                    name: pName,
                    price: pPrice,
                    description: pDescription,
                    inStock: pInStock,
                    images: pImages,
                    statusCode: 200
                })
            }).catch(error => {
                this.setState({
                    statusCode: error.response.status,
                    errorMessage: error.message,
                })
            });
    }

    render() {
        return (<div className='containerProductDetalsWithCondition'>
        {this.state.statusCode === 200 ? (<div className='containerProductDetals'>
            <div className='pictures'>
                <div className='big'><img src={this.state.images[0]} alt='img'></img></div>
                <div className='smallContainer'>
                    {this.state.images.slice(1).map((element, key) => (
                        <div className='small' key={key}>
                            <img src={element} alt='img'></img>
                        </div>
                    ))}
                </div>
            </div>
            <div className='productDetails'>
                <h3>{this.state.name}</h3>
                <p>{this.state.description}</p>
                <div className='price'>Price: {this.state.price} $</div>
                <div className='price'>Available: {this.state.inStock}</div>
                <div className='numberBar'>
                    <div className='titleNumber'>Number</div>
                    <button className='nBtn' onClick={this.handleDecrement}>-</button>
                    <span className='number'>{this.state.count}</span>
                    <button className='nBtn' onClick={this.handleIncrement}>+</button>
                </div>
                <div className='addCartOrBuy'>
                    <Link to={"http://localhost:3000/cart/" + localStorage.getItem("userId")}>
                    <button className='addToCart' onClick={this.handleClick}>
                        <i className="bi bi-cart"></i>
                        Add to cart
                    </button>
                    </Link>
                    <button className='buyNow'>
                        Buy now
                    </button>
                </div>
            </div>
        </div>) : (<div>
            <h1>{this.state.statusCode}</h1>
            <p>{this.state.errorMessage}</p></div>)}
        </div>
        )
    }
}
export default withRouter(ProductDetails)

