import React, {Component} from 'react'
import withRouter from './WithRouter';
import req, {be_url} from '../../share';
import axios from "axios";

class ProductsByCategory extends Component {
    state = {
        products: [],
    }

    componentDidMount() {
        const category = this.props.params.category;
        const page = this.props.params.page;
        this.fetchProducts(category, page);
    }

    fetchProducts(category, page) {
        axios.get(be_url + "product/" + category + "/" + page)
            .then((res) => {
                console.log(res)
                this.setState({products: res.data.content})
            })
            .catch((error) => {

            })
    }

    render() {
        if (this.state.products.length !== 0) {
            return (
                <section className="container">
                    <div className='carousel'>
                        <img src="/images/book3.webp" alt='book3'/>
                    </div>
                    <hr></hr>
                    <div className="wrapper">
                        <div className="inner">
                            <div className="grid mg-left-10">
                                <div className="products">
                                    <div className="box">
                                        {
                                            this.state.products.map(product => (
                                                <div className="item text-center" key={product.id}>
                                                    <a href={"/product/" + product.id} className="product-item">
                                                        <div className="product-img">
                                                            <img className="lazy-load"
                                                                 src={product.images[0]}
                                                                 data-src={product.images}
                                                                 alt={product.name}/>
                                                            <div className="sale-off">-20%</div>
                                                        </div>
                                                        <div className="product-title">{product.name}</div>
                                                        <div className="product-price">
                                                            <span
                                                                className="current-price">{product.price.toFixed(2)}$</span>
                                                            <span
                                                                className="original-price"><s>{(product.price * 1.2).toFixed(2)}$</s></span>
                                                        </div>
                                                    </a>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        } else {
            return (
                <section className="container">
                    <div className='carousel'>
                        <img src="/images/book3.webp" alt='book3'/>
                    </div>
                    <hr></hr>
                    <div className="wrapper"> 
                        <div className="inner text-center mt-5">
                            <h2>Nothing was found</h2>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

export default withRouter(ProductsByCategory);