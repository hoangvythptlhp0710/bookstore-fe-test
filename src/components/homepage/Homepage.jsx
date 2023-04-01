import React, {Component} from 'react'
import axios from "axios";
import "./Homepage.css";
import {useLocation} from 'react-router-dom';

class HomepageWithLocation extends Component {
    state = {
        products: [],
        pages: 0,
        current: 0,
        search: ""
    }

    url = "http://localhost:8080/"

    componentDidMount() {
        this.fetchProductList();
    }

    fetchSearch = () => {
        axios.get(this.url + "search", {params: {name: this.props.location.state.name}}).then((res) => {
            const products = res.data.content;
            const pages = res.data.totalPages;
            const current = res.data.number;
            this.setState({
                products,
                pages,
                current,
                search: this.props.location.state.name
            });
        })
    }

    fetchSort = (direction) => {
        this.props.location.state.name = null;
        axios.get(this.url, {params: {price: true, direction: direction}}).then((res) => {
            const products = res.data.content;
            const pages = res.data.totalPages;
            const current = res.data.number;
            this.setState({
                products,
                pages,
                current,
                search: this.props.location.state.name
            });
        })
    }

    fetchProductList = () => {
        axios.get(this.url).then((res) => {
            const products = res.data.content;
            const pages = res.data.totalPages;
            const current = res.data.number;
            this.setState({
                products,
                pages,
                current
            });
        })
    }

    handleSwitch = (i) => {
        axios.get(this.url + i).then((res) => {
            const products = res.data.content;
            console.log(res.data)
            this.setState({
                products,
                current: i
            });
        })
    }

    handleSearchSwitch = (i) => {
        axios.get(this.url + "search/" + i).then((res) => {
            const products = res.data.content;
            console.log(res.data)
            this.setState({
                products,
                current: i
            });
        })
    }

    render() {
        const arr = [];
        if (this.props.location.state !== null) {
            if (this.props.location.state.name !== this.state.search)
                this.fetchSearch();
            for (let i = 0; i < this.state.pages; i++) {
                if (this.state.current === i) {
                    arr.push(<button className="page page-clicked" key={"page_" + i} onClick={() => {
                        this.handleSearchSwitch(i)
                    }}>{i + 1}</button>)
                } else {
                    arr.push(<button className="page page-click" key={"page_" + i} onClick={() => {
                        this.handleSearchSwitch(i)
                    }}>{i + 1}</button>)
                }
            }
        } else {
            const arr = [];
            for (let i = 0; i < this.state.pages; i++) {
                if (this.state.current === i) {
                    arr.push(<button className="page page-clicked" key={"page_" + i} onClick={() => {
                        this.handleSwitch(i)
                    }}>{i + 1}</button>)
                } else {
                    arr.push(<button className="page page-click" key={"page_" + i} onClick={() => {
                        this.handleSwitch(i)
                    }}>{i + 1}</button>)
                }
            }
        }
        if (this.state.products.length !== 0)
            return (
                <section className="container">
                    <div className="wrapper">
                        <div className="text-center">
                            <button className="bi-sort-up btn btn-outline-secondary m-2"
                                    onClick={() => {this.fetchSort("asc")}}> Price
                            </button>
                            <button className="bi-sort-down btn btn-outline-secondary m-2"
                                    onClick={() => {this.fetchSort("desc")}}> Price
                            </button>
                        </div>
                        <div className="inner">
                            <div className="grid mg-left-10">
                                <div className="products">
                                    <div className="box">
                                        {
                                            this.state.products.map(product => (
                                                <div className="item text-center" key={product.id}>
                                                    <a href="/#" className="product-item">
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

function Homepage(props) {
    let location = useLocation();
    return <HomepageWithLocation {...props} location={location}/>
}

export default Homepage;