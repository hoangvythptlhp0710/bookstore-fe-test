import ProductList from "./ProductList";
import React, { useState } from "react";


export default function Admin() {
    const [reloadList] = useState(false);

    return (
        <div className="container text-center card mt-3">
            <div className="row">
               
                <div className="col">
                    <ProductList reloadList={reloadList} />
                </div>
            </div>
        </div>
    )
}