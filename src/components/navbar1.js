import React, { useState } from "react";
import Logo from "../assets/logo1.png";
import { MdSearch } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import {Navbar,Nav,Container,Dropdown,InputGroup,FormControl,Button,Offcanvas,} from "react-bootstrap";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function CustomNavbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={Logo} alt="Logo" style={{ width: "80px" }} />
        </Navbar.Brand>

        {/* Toggle button for responsive */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          {/* Links */}
          <Nav className="me-auto">
            <Dropdown className="hover-dropdown">
                {/* Tiêu đề danh mục */}
                <Dropdown.Toggle id="dropdown-basic" variant="link" className="dropdown-title">
                    Danh mục
                </Dropdown.Toggle>

                {/* Menu dropdown */}
                <Dropdown.Menu>
                    {[
                    "Thời trang",
                    "Giày dép - Túi sách",
                    "Điện tử - Công nghệ",
                    "Sức khỏe - Làm đẹp",
                    "Đồ gia dụng",
                    "Đồ trang trí",
                    "Mẹ và bé",
                    "Sách - Văn phòng phẩm",
                    ].map((item, idx) => (
                    <Dropdown.Item key={idx} href="/">
                        {item}
                    </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Nav.Link href="/">Giá ưu đãi</Nav.Link>
            <Nav.Link href="/">Sản phẩm bán chạy</Nav.Link>
          </Nav>

          {/* Search Input */}
          <InputGroup className="w-50 me-3">
            <FormControl placeholder="Search" />
            <Button variant="outline-secondary">
              <MdSearch />
            </Button>
          </InputGroup>

          {/* Cart and User */}
          <Nav>
            <Nav.Link onClick={() => setSidebarVisible(true)}>
              <div className="position-relative d-inline-block">
                <CiShoppingCart size={25} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                  style={{ fontSize: "0.75rem" }}
                >
                  0
                </span>
              </div>
            </Nav.Link>
            <Nav.Link>
              <AiOutlineUser size={25} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Sidebar for Cart */}
      <Offcanvas
        show={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Giỏ hàng của bạn</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Danh sách sản phẩm...</p>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default CustomNavbar;
