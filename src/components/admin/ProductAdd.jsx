import axios from "axios";
import React from "react";
import "./Admin.css";


export default class ProductAdd extends React.Component {
    state = {
        name: '',
        description: '',
        price:'',
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

    handleAddImage = (e) => {
        if (e.target.id === "images") {
            // Split the comma-separated string into an array of strings
            const images = e.target.value.split(",");
            this.setState({ [e.target.id]: images });
          } else {
            this.setState({ [e.target.id]: e.target.value });
          }
  }


    handleCategoryChange = (e) => {
        this.setState({
            category: e.target.value
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
            images: [],
            category: ''
        })

        const product = {
            name: this.state.name,
            description: this.state.description,
            price: Number(this.state.price),
            inStock: Number(this.state.inStock),
            images: this.state.images,
            category: this.state.category
        }

        const accessToken = localStorage.getItem('accessToken');


        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          };


        axios.post(this.url + 'admin/product', product, { headers })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    window.location = "/admin";
                }
                // this.props.reloadProductList();         
            })
            .catch(error => {
                console.error(error);
            })
    }

    render() {
        return (
            <div className="container text-center mt-3 mb-5">
                <h3 className=" text-primary- p-2 ">
                    ADD NEW PRODUCT
                </h3>
                <form className="form add card p-3 " onSubmit={this.handleSubmit}>
                    <label className=" h6 guide">Name</label>
                    <input type="text" className="form-control enter" id="name" value={this.state.name}  required onChange={this.handleChange} />

                    <label className=" h6 guide">Description</label>
                    <input type="text" className="form-control enter" id="description" value={this.state.description}  required onChange={this.handleChange} />

                    <label className="h6 guide">Price</label>
                    <input type="number" className="form-control enter" id="price" value={this.state.price}  required onChange={this.handleChange} />


                    <label className="h6 guide">Quantity</label>
                    <input type="number" className="form-control enter" id="inStock" value={this.state.inStock}  required onChange={this.handleChange} />


                    <label className="h6 guide">Images</label>
                    <input type="text" className="form-control enter" id="images" value={this.state.images}  required onChange={this.handleAddImage}  />


                    <label className=" h6 guide ">Category</label>
                    <select  className="form-control enter" id="category" onChange={ this.handleCategoryChange } >
                            <option >Select Category</option>
                            <option value="Comic">Comic</option>
                            <option value="Detective">Detective</option>
                            <option value="Literature">Literature</option>
                            <option value="Adventure">Aventure</option>
                            <option value="Classics">Classics</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Horror">Horro</option>
                    </select>
                   
                    <div className="btnSubmit">
                        <button type="submit" className="btn btn-primary  bg-success">Add Product</button>
                       
                    </div>
                </form>
            </div>
        )
    }
}