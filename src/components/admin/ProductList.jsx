import axios from "axios";
// import { Link } from "react-router-dom";
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default class ProductList extends React.Component {
   
    state = {
        products: [],
        pages: 0,
        current: 0,
        search: ""
    }

    url = "http://localhost:8080/";

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
                pages,
                current
            });
        })
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reloadList !== prevProps.reloadList) {
            this.fetchProductList();
        }
    }

    

   
   
    deleteRow = (id) => {
        const accessToken = localStorage.getItem('accessToken');


        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          };
        axios.delete(`${this.url}admin/product/${id}`, {headers})
            .then(res => {
                console.log(res);
                console.log(res.data);
                const products = this.state.products.filter(item => item.id !== id);
                this.setState({ products })
            })
    }


    render() {

        return (
          
            <div className="container text-center mt-3">
                <table className="table ">
                    <thead>
                        <tr>
                            <th colSpan="8" >
                            <h3 className="text">PRODUCT MANAGEMENT</h3>

                            
                            <a href="/admin/add"><i className="bi bi-file-plus-fill"></i></a>
                            </th>
                        </tr>
                        
                        <tr className="h5">
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            {/* <th scope="col">Description</th> */}
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        {/* <td>{product.description}</td> */}
                                        <td>{product.images}</td>
                                        <td>{product.price}</td>
                                        <td>{product.inStock}</td>
                                        
                                        
                                        <td>
                                            {/* <Link to={"/update/" + product.id  } className="btn btn-primary">Update</Link> */}
                                            
                                            <a href={`/admin/product/` + `${product.id}`}><i className="bi bi-pen"></i></a>
                                        </td>
                                        <td>
                                        {/* <button className="btn btn-danger" onClick={() => { this.deleteRow(product.id) }}>DELETE</button> */}
                                        <i className="bi bi-trash" onClick={() => { this.deleteRow(product.id) }}></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        )
    }
}
