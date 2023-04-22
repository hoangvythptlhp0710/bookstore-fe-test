import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/auth/Register'
import Homepage from './components/homepage/Homepage'
import Login from "./components/auth/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ProductAdd from './components/admin/ProductAdd';
import Admin from './components/admin/Admin';
import "./App.css"
import ProductUpdate from './components/admin/ProductUpdate';
import ProductDetails from './components/products/ProductDetails';
import UpdateCustomer from "./components/customer/customerProfile/UpdateCustomer";
import ProductsByCategory from './components/products/ProductsByCategory';
import ShoppingCart from './components/customer/cart/ShoppingCart'
import NotFound from "./components/others/NotFound";
import CheckoutOrder from './components/order/CheckoutOrder';
import OrderByStatus from './components/order/OrderByStatus';


function App() {

    return (
        <Router>
            <Header/>
            <div className="App">
                <Routes>
                    {/* permit all */}
                    <Route path="/product/:id" element={<ProductDetails/>}/>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/product/:category/:page' element={<ProductsByCategory/>}></Route>
                    <Route path="/order/:id"  element={<CheckoutOrder/>}></Route>
                    <Route path="/order" element={<OrderByStatus />}></Route>
                    {/* admin only */}
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/admin/add" element={<ProductAdd/>}/>
                    <Route path="/admin/product/:id" element={<ProductUpdate/>}/>
                    {/* user only */}
                    <Route path='/cart' element={<ShoppingCart/>}></Route>
                    <Route path="/customer/:id" element={<UpdateCustomer/>}/>
                    <Route path="/*" element={<NotFound title='(╥﹏╥) 404 error: Page not found!' details='We cannot find this page, please try again later!'/>}/>
                </Routes>
            </div>
            <Footer/>
        </Router>
    )
}

export default App
