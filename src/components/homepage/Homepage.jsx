import React, {Component} from 'react'
import axios from "axios";
import "./Homepage.css";

export default class Homepage extends Component {
    state = {
        products: [],
        pages: 0,
        current: 0
    }

    url = "http://localhost:8080/"

    componentDidMount() {
        this.fetchProductList();
    }

    fetchProductList = () => {
        axios.get(this.url).then((res) => {
            const products = res.data.content;
            const pages = res.data.totalPages;
            const current = res.data.number;
            this.setState({
                products,
                pages
            });
        })
    }

    handleSwitch = (i) => {
        axios.get(this.url + i).then((res) => {
            const products = res.data.content;
            const pages = res.data.totalPages;
            console.log(res.data)
            this.setState({
                products,
                pages
            });
        })
        this.fetchProductList();
    }

    render() {
        const arr = [];
        for (let i = 0; i < this.state.pages; i++) {
            if (this.state.current == i) {
                arr.push(<span className="page page-clicked" key={"page_"+ i} onClick={() => {
                    this.handleSwitch(i)
                }}>{i+1}</span>)
            } else {
                arr.push(<span className="page page-click" key={"page_" + i} onClick={() => {
                    this.handleSwitch(i)
                }}>{i+1}</span>)
            }
        }
        if (this.state.products.length !== 0)
            return (
                <section className="container">
                    <div className="wrapper">
                        <div className="inner">
                            <div className="grid mg-left-10">
                                <div className="products">
                                    <div className="box">
                                        {
                                            this.state.products.map(product => (
                                                <div className="item text-center" key={product.id}>
                                                    <a href="#" className="product-item">
                                                        <div className="product-img">
                                                            <img className="lazy-load"
                                                                 src={product.images}
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
                                    <div>
                                        {arr}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
    }
}
