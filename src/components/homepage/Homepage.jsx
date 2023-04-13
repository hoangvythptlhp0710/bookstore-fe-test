import React, {Component} from 'react'
import axios from "axios";
import "./Homepage.css";
import {useLocation} from 'react-router-dom';
import {be_url} from '../share';

class HomepageWithLocation extends Component {
    state = {
        products: [],
        pages: 0,
        current: 0,
        search: ""
    }

    componentDidMount() {
        this.fetchProductList();
    }

    fetchSearch = () => {
        axios.get(`${be_url}search`, {params: {name: this.props.location.state.name}}).then((res) => {
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

    fetchSort = (direction, criteria) => {
        this.props.location.state = null;
        let config = {};
        if (criteria === 'price') {
            config = {params: {price: true, direction: direction}}
        }
        if (criteria === 'name') {
            config = {params: {name: true, direction: direction}}
        }
        if (criteria === 'inStock') {
            config = {params: {inStock: true, direction: direction}}
        }
        if (criteria === 'category') {
            config = {params: {category: true, direction: direction}}
        }
        axios.get(be_url, config).then((res) => {
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

    fetchProductList = () => {
        axios.get(be_url).then((res) => {
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
        axios.get(`${be_url}${i}`).then((res) => {
            const products = res.data.content;
            console.log(res.data)
            this.setState({
                products,
                current: i
            });
        })
    }

    handleSearchSwitch = (i) => {
        axios.get(`${be_url}search/${i}`).then((res) => {
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
            for (let i = this.state.pages - 1; i >= 0; i--) {
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
            for (let i = this.state.pages - 1; i >= 0; i--) {
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
        if (this.state.products.length !== 0) {
            return (
                <section className="container">
                    <div className='carousel'>
                        <img src="/images/book3.webp" alt='book3'/>
                    </div>
                    <hr></hr>
                    <div className="wrapper">
                        <div className="text-center">
                            <button className="bi-sort-numeric-up-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("asc", "price")
                                    }}> Price
                            </button>
                            <button className="bi-sort-numeric-down-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("desc", "price")
                                    }}> Price
                            </button>
                            <button className="bi-sort-alpha-up-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("asc", "name")
                                    }}> Name
                            </button>
                            <button className="bi-sort-alpha-down-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("desc", "name")
                                    }}> Name
                            </button>
                            <button className="bi-sort-up btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("asc", "category")
                                    }}> Category
                            </button>
                            <button className="bi-sort-down btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("desc", "category")
                                    }}> Category
                            </button>
                            <button className="bi-sort-numeric-up-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("asc", "inStock")
                                    }}> In Stock
                            </button>
                            <button className="bi-sort-numeric-down-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("desc", "inStock")
                                    }}> In Stock
                            </button>
                        </div>
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
                                    <div>
                                        {arr.map((item) => (
                                            <div>
                                                {item}
                                            </div>
                                        ))}
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
                        <div className="text-center">
                            <button className="bi-sort-numeric-up-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("asc", "price")
                                    }}> Price
                            </button>
                            <button className="bi-sort-numeric-down-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("desc", "price")
                                    }}> Price
                            </button>
                            <button className="bi-sort-alpha-up-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("asc", "name")
                                    }}> Name
                            </button>
                            <button className="bi-sort-alpha-down-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("desc", "name")
                                    }}> Name
                            </button>
                            <button className="bi-sort-up btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("asc", "category")
                                    }}> Category
                            </button>
                            <button className="bi-sort-down btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("desc", "category")
                                    }}> Category
                            </button>
                            <button className="bi-sort-numeric-up-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("asc", "inStock")
                                    }}> In Stock
                            </button>
                            <button className="bi-sort-numeric-down-alt btn btn-outline-secondary m-2"
                                    onClick={() => {
                                        this.fetchSort("desc", "inStock")
                                    }}> In Stock
                            </button>
                        </div>
                        <div className="inner text-center mt-5">
                            <h2>Nothing was found</h2>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

function Homepage(props) {
    let location = useLocation();
    return <HomepageWithLocation {...props} location={location}/>
}

export default Homepage;