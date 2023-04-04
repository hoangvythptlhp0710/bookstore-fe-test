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



function App() {

    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    {/* <Route path="/admin/product" element={<ProductList/>}/> */}
                    <Route path="/admin/add" element={<ProductAdd/>}/>
                </Routes>
                <Footer/>
                
            </div>
        </Router>
    )
}

export default App
