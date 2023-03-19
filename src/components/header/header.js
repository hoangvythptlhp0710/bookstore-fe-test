import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" fixed='top'>
      <Navbar.Brand href="/">Our Bookstore</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/categories">Categories</Nav.Link>
          <Nav.Link href="/about">About Us</Nav.Link>
        </Nav>
        <Form inline>
          <div className="d-flex">
            <FormControl type="text" placeholder="Search" className="mr-2" />
            <Button variant="outline-dark">Search</Button>
          </div>
        </Form>
        <Nav className="ml-auto">
          <Nav.Link href="/login">Log in</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
