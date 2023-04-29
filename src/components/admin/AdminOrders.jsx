import React from "react";
import req, {be_url, fe_url, role} from "../others/Share";
import withRouter from '../products/WithRouter';
import Header from "../header/Header";
import NotFound from "../others/NotFound";
import Footer from "../footer/Footer";

class OrderByStatus extends React.Component {
    state = {
        status: new URLSearchParams(this.props.location.search).get("status"),
        orders: []
    }
    base_link = fe_url + "order?status="

    componentDidMount() {
        this.fetchOrderByStatus();
    }

    fetchOrderByStatus = () => {
        req.get(be_url + "order?status=" + this.state.status)
            .then((res) => {
                this.setState({orders: res.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleUpdateStatus = (id, fromStatus, toStatus) => {
        const body = {
            fromStatus: fromStatus,
            toStatus: toStatus,
        };
        req.put(be_url + "order/" + id, body)
            .catch((error) => {
                console.log(error)
            })
        this.fetchOrderByStatus()
    }

    render() {
        if (role === "ROLE_ADMIN") {
            if (this.state.orders.length !== 0) {
                return (
                    <div className="container">
                        {/*aside*/}
                        <div className="row">
                            <div className="col-3">
                                <aside className="admin-aside">
                                    <div className="web-name">
                                        <a href={fe_url}><img className="admin-logo" src="/images/icon.jpg"
                                                              alt="logo"/><span>PRO BOOKSTORE</span></a>

                                    </div>
                                    <a className="admin-navigation" href={fe_url + "admin/products"}>Manage
                                        products</a>
                                    <a className="admin-navigation current-pos" href={fe_url + "admin/orders"}>Manage
                                        orders</a>
                                    <a className="admin-navigation" href={fe_url + "admin/vouchers"}>Manage vouchers</a>
                                </aside>
                            </div>
                            {/*header*/}
                            <div className="col-9">
                                <article className="admin-header">
                                    <span className="welcome">Welcome ADMIN!</span>&nbsp;&nbsp;
                                    <span onClick={this.logout} className="bi bi-box-arrow-right"/>
                                </article>
                                {/*admin*/}
                                <article className="admin-body">
                                    <table className="table-list">
                                        <thead className="product-detail">
                                        <h1 className="manager">Orders</h1>
                                        <tr>
                                            <th><a className="table_header" href={fe_url + "admin/orders"}>All</a></th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "customer_confirmed"}>Checked out</a></th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "admin_preparing"}>Preparing</a></th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "shipping"}>Shipping</a>
                                            </th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "customer_request_cancel"}>Request cancel</a>
                                            </th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "customer_canceled"}>Cancelled</a></th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "success"}>Success</a></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.orders.map(order =>
                                            (<div key={order.id}><h2>Orders: {order.orderStatus}</h2>
                                                <hr></hr>
                                                {order.items.map(item => (<div className="item" key={item.productId}>
                                                    <p><img src={item.images[0]} alt="product"></img></p>
                                                    <p className="name_cat"><h4>{item.productName}</h4>
                                                        <p>{item.category}</p></p>
                                                    <p className="price_quant"><h6>{item.price} $</h6>
                                                        <p>Quantity: {item.quantity}</p></p>
                                                    <p>Total/1 item: {item.price * item.quantity} $</p>
                                                </div>))}
                                                <p>Payment method: {order.paymentMethod}</p>
                                                <p>Total order: {order.total} $</p>
                                                {(role === "ROLE_ADMIN" && order.orderStatus === "customer_confirmed") &&
                                                    <button
                                                        onClick={() => this.handleUpdateStatus(order.id, order.orderStatus, "admin_preparing")}>Prepare</button>}
                                                {(role === "ROLE_ADMIN" && order.orderStatus === "admin_preparing") &&
                                                    <button
                                                        onClick={() => this.handleUpdateStatus(order.id, order.orderStatus, "shipping")}>Ship</button>}
                                                {order.orderStatus === "customer_confirmed" && <button
                                                    onClick={() => this.handleUpdateStatus(order.id, order.orderStatus, "customer_canceled")}>Cancel</button>}
                                                {(order.orderStatus === "success" || order.orderStatus === "customer_canceled") &&
                                                    <button>Buy again</button>}
                                                <hr></hr>
                                            </div>)
                                        )}
                                        </tbody>
                                        <tfoot>
                                        <p className="book-available">{this.state.orders.length} orders
                                            available</p>
                                        </tfoot>
                                    </table>
                                </article>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container">
                        {/*aside*/}
                        <div className="row">
                            <div className="col-3">
                                <aside className="admin-aside">
                                    <div className="web-name">
                                        <a href={fe_url}><img className="admin-logo" src="/images/icon.jpg"
                                                              alt="logo"/><span>PRO BOOKSTORE</span></a>

                                    </div>
                                    <a className="admin-navigation" href={fe_url + "admin/products"}>Manage
                                        products</a>
                                    <a className="admin-navigation current-pos" href={fe_url + "admin/orders"}>Manage
                                        orders</a>
                                    <a className="admin-navigation" href={fe_url + "admin/vouchers"}>Manage vouchers</a>
                                </aside>
                            </div>
                            {/*header*/}
                            <div className="col-9">
                                <article className="admin-header">
                                    <span className="welcome">Welcome ADMIN!</span>&nbsp;&nbsp;
                                    <span onClick={this.logout} className="bi bi-box-arrow-right"/>
                                </article>
                                {/*admin*/}
                                <article className="admin-body">
                                    <table className="table-list">
                                        <thead className="product-detail">
                                        <h1 className="manager">Orders</h1>
                                        <tr>
                                            <th><a className="table_header" href={fe_url + "admin/orders"}>All</a></th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "customer_confirmed"}>Checked out</a></th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "admin_preparing"}>Preparing</a></th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "shipping"}>Shipping</a>
                                            </th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "customer_request_cancel"}>Request cancel</a>
                                            </th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "customer_canceled"}>Cancelled</a></th>
                                            <th><a className="table_header"
                                                   href={this.base_link + "success"}>Success</a></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                        <tfoot>
                                        <p className="book-available">0 orders
                                            available</p>
                                        </tfoot>
                                    </table>
                                </article>
                            </div>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <>
                    <Header/>
                    <NotFound title='(╥﹏╥) Access denied!' details='You have no permission to access this page!'/>
                    <Footer/>
                </>
            )
        }
    }
}

export default withRouter(OrderByStatus)