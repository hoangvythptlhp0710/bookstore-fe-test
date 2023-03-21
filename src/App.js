import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/auth/Register'
import Success from './Success'
import Login from "./components/auth/Login";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Routes>
                            <Route path="/" element={<Success/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default App
