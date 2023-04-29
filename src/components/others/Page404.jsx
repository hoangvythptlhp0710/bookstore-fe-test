import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Page404(props) {
    return (<>
            <Header/>
            <section className="container">
                <div className="text-center empty">
                    <h2>{props.title}</h2>
                    <h5>{props.details}</h5>
                </div>
            </section>
            <Footer/>
        </>
    )
}