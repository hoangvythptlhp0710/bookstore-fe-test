import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";



export default class ProductAdd extends React.Component {
    state = {
        name: '',
        description: '',
        price: '',
        inStock: '',
        images: '',
        category: ''
    }



    url = "http://localhost:8080/"

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        event.target.reset();
        this.setState({
            name: '',
            description: '',
            price: '',
            inStock: '',
            images: '',
            category: ''
        })

        const product = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            inStock: this.state.inStock,
            images: this.state.images,
            category: this.state.category
        }

        axios.post(this.url + 'admin/product', product)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                this.props.reloadProductList();
               
            })
    }

    render() {
        return (
            <div className="container text-center mt-3 mb-5">
                <h3 className=" text-primary- p-2">
                    ADD NEW PRODUCT
                </h3>
                <form className="form add card p-3 " onSubmit={this.handleSubmit}>
                    <label className="form-label h5 text-succes">Name</label>
                    <input type="text" className="form-control" id="name" value={this.state.name}  required onChange={this.handleChange} />

                    <label className="form-label h5 text-succes">Description</label>
                    <input type="text" className="form-control" id="description" value={this.state.description}  required onChange={this.handleChange} />

                    <label className="form-label h5 text-succes">Price</label>
                    <input type="text" className="form-control" id="price" value={this.state.price}  required onChange={this.handleChange} />


                    <label className="form-label h5 text-succes">Quantity</label>
                    <input type="text" className="form-control" id="inStock" value={this.state.inStock}  required onChange={this.handleChange} />


                    <label className="form-label h5 text-succes">Images</label>
                    <input type="text" className="form-control" id="images" value={this.state.images}  required onChange={this.handleChange} />


                    <label className="form-label h5 text-succes">Category</label>
                    <select  className="form-control" id="category">
                            <option value="Comic">Comic</option>
                            <option value="Detective">Detective</option>
                            <option value="Literature">Literature</option>
                            <option value="Adventure">Aventure</option>
                            <option value="Classics">Classics</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Horror">Horro</option>
                    </select>
                   
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary  bg-success"> 
                        Add Book
                        </button>
                        <Link to={"/admin" } className="btn btn-primary " type="submit" >Add product</Link>
                    </div>
                </form>
            </div>
        )
    }
}