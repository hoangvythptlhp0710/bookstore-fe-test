import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="dark-footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Contact Us</h3>
                        <p>123 Main St.</p>
                        <p>Anytown, USA 12345</p>
                        <p>Phone: 555-555-5555</p>
                        <p>Email: info@example.com</p>
                    </div>
                    <div className="col-md-6">
                        <h3>About Us</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
