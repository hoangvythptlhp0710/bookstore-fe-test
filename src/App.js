import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/auth/Register'
import Homepage from './components/homepage/Homepage'
import Login from "./components/auth/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// import ProductList from './components/admin/ProductList';
import ProductAdd from './components/admin/ProductAdd';
import Admin from './components/admin/Admin';
import ProductDetails from './components/products/ProductDetails';
import "./App.css"
import ShoppingCart from './components/cart/ShoppingCart';



function App() {

    return (
        <Router>
            <Header/>
            <div className="App">
                <Routes>
                    <Route path="/product/:id" element={<ProductDetails/>} />
                    <Route path='/cart/:userId' element={<ShoppingCart/>}></Route>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    {/* <Route path="/admin/product" element={<ProductList/>}/> */}
                    <Route path="/admin/add" element={<ProductAdd/>}/>
                </Routes>
                <Footer/>
                
            </div>
            <Footer/>
        </Router>
    )
}

export default App
