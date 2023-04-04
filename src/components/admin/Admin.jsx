import ProductList from "./ProductList";
// import ProductAdd from './components/admin/ProductAdd';
import React, { useState } from "react";


export default function Admin() {
    const [reloadList] = useState(false);

//   const handleReloadList = () => {
//     setReloadList(!reloadList);
//   }
    return (
        <div className="container text-center card mt-3">
            <div className="row">
                {/* <div className="col">
                    <StudentAdd reloadStudentList={handleReloadList} />
                </div> */}
                <div className="col">
                    <ProductList reloadList={reloadList} />
                </div>
            </div>
        </div>
    )
}