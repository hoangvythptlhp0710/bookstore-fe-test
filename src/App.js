import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/auth/Register'
import Homepage from './components/homepage/Homepage'
import Login from "./components/auth/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import UpdateCustomer from "./components/auth/UpdateCustomer";
import ProductDetails from './components/products/ProductDetails';
import "./App.css"
import ShoppingCart from './components/cart/ShoppingCart';
import ProductsByCategory from './components/products/ProductsByCategory';


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
                    {/*<Route path="/customer{customerId}" element={<UpdateCustomer/>}/>*/}
                    <Route path="/update" element={<UpdateCustomer/>}/>
                    <Route path='/product/:category/:page' element={<ProductsByCategory/>}></Route>
                </Routes>
            </div>
            <Footer/>
        </Router>
    )
}

export default App
