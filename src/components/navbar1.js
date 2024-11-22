import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import '../App.css';


function Navbar1() {
  return (
    <Navbar expand="lg" className="custom-navbar clean-navbar" fixed="top">
      <Container>
        <Navbar.Brand href="#">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto" navbarScroll>
            <Nav.Link href="index.html" className="active">
              Home
            </Nav.Link>
            <Nav.Link href="catalog-page.html">Catalog</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action1">Option 1</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Option 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action3">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
