import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import req, {be_url} from "../share";

//form update 
export default function ProductUpdate(props) {
    const {id} = useParams();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        inStock: "",
        images: "",
        category: ""
    })

    useEffect(() => {
        fetchProductList();
        console.log("listProduct");
    }, [])

    const {name, description, price, inStock, images, category} = product;

    const handleChange = (event) => {
        setProduct({...product, [event.target.id]: event.target.value})
        console.log(product);
    }
    const submitForm = async (e) => {
        e.preventDefault();
        console.log(product);
        await req.put(`${be_url}admin/product/${id}`, product)
            .then((result) => {
                console.log(result);
                // history("/");
                window.location = "/admin";

            })
    }

    let fetchProductList = async () => {
        await req.get(be_url + 'product/' + id).then((res) => {
            const products = res.data;
            console.log(products);
            setProduct(products);
            console.log(product);
        })
    };


    return (
        <div className="container text-center mt-3 mb-5">
            <h3 className=" text-primary- p-2 ">
                UPDATE A PRODUCT
            </h3>
            <form className="form add card p-3 " onSubmit={(e) => {
                submitForm(e)
            }}>
                <label className=" h6 guide">Name</label>
                <input type="text" className="form-control enter" id="name" value={name} required
                       onChange={(e) => handleChange(e)}/>

                <label className=" h6 guide">Description</label>
                <input type="text" className="form-control enter" id="description" value={description} required
                       onChange={(e) => handleChange(e)}/>

                <label className="h6 guide">Price</label>
                <input type="number" className="form-control enter" id="price" value={price} required
                       onChange={(e) => handleChange(e)}/>


                <label className="h6 guide">Quantity</label>
                <input type="number" className="form-control enter" id="inStock" value={inStock} required
                       onChange={(e) => handleChange(e)}/>


                <label className="h6 guide">Images</label>
                <input type="text" className="form-control enter" id="images" value={images} required
                       onChange={(e) => handleChange(e)}/>


                <label className=" h6 guide ">Category</label>
                <select className="form-control enter" id="category" value={category} required
                        onChange={(e) => handleChange(e)}>
                    <option>Select Category</option>
                    <option value="Comic">Comic</option>
                    <option value="Detective">Detective</option>
                    <option value="Literature">Literature</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Classics">Classics</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Horror">Horro</option>
                </select>

                <div className="btnSubmit">
                    <button type="submit" className="btn btn-primary  bg-success">Update Product</button>

                </div>
            </form>
        </div>


    )
}