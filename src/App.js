import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/auth/Register'
import Homepage from './components/homepage/Homepage'
import Login from "./components/auth/Login";
import ProductAdd from './components/admin/ProductAdd';
import "./App.css"
import ProductUpdate from './components/admin/ProductUpdate';
import ProductDetails from './components/products/ProductDetails';
import UpdateCustomer from "./components/customer/customerProfile/UpdateCustomer";
import ProductsByCategory from './components/products/ProductsByCategory';
import ShoppingCart from './components/customer/cart/ShoppingCart'
import CheckoutOrder from './components/order/CheckoutOrder';
import OrderByStatus from './components/order/OrderByStatus';
import CheckBill from './components/order/CheckBill';
import SuccessNotify from './components/order/SuccessNotify';
import FailNotify from './components/order/FailNotify';


function App() {
    return (
        <Router>
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
                    <Route path="/bill" element={<CheckBill />}></Route>
                    <Route path="/success" element={<SuccessNotify />}></Route>
                    <Route path="/fail" element={<FailNotify/>}></Route>


                    
                    {/* admin only */}
                    <Route path="/admin/product/add" element={<ProductAdd/>}/>
                    <Route path="/admin/product/:id" element={<ProductUpdate/>}/>
                    <Route path="/admin/products" element={<AdminProducts/>}></Route>
                    <Route path="/admin/orders" element={<AdminOrders/>}></Route>
                    <Route path="/admin/vouchers" element={<AdminVouchers/>}></Route>
                    <Route path="/admin/voucher/add" element={<VoucherAdd/>}></Route>
                    {/* user only */}
                    <Route path='/cart' element={<ShoppingCart/>}></Route>
                    <Route path="/my_profile" element={<UpdateCustomer/>}/>
                    <Route path="/orders" element={<OrderByStatus/>}></Route>
                    <Route path="/bill" element={<CheckBill/>}></Route>
                    <Route path="/success" element={<SuccessNotify/>}></Route>
                    <Route path="/order/:id" element={<CheckoutOrder/>}></Route>

                    <Route path="/*" element={<Page404 title='(╥﹏╥) 404 error: Page not found!'
                                                       details='We cannot find this page, please try again later!'/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
