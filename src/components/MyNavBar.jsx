import React, { useState } from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import ModalLogin from "./modals/ModalLogin";
import ModalAddItem from "./modals/ModalAddItem";
import ModalAddSupplier from "./modals/ModalAddSupplier";
import ModalEditItem from "./modals/ModalEditItem";
import komar from "../assets/komar.png";
import ModalWhIn from "./modals/ModalWhIn";

function MyNavBar() {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalAddItem, setShowModalAddItem] = useState(false);
  const [showModalAddSupplier, setShowModalAddSupplier] = useState(false);
  const [showModalEditItem, setShowModalEditItem] = useState(false);
  const [showModalWhIn, setShowModalWhIn] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditItem = (product) => {
    setSelectedProduct(product);
    setShowModalEditItem(true);
  };

  const handleCloseModal = () => {
    setShowModalLogin(false);
  };

  const handleShowModal = () => {
    setShowModalLogin(true);
  };

  const handleLogin = () => {
    // Обработка логина
    console.log("Login attempt");
    handleCloseModal();
  };

  const handleCloseAddItem = () => setShowModalAddItem(false);
  const handleShowAddItem = () => setShowModalAddItem(true);

  const handleCloseWhIn = () => setShowModalWhIn(false);
  const handleShowWhIn = () => setShowModalWhIn(true);

  const handleCloseAddSupplier = () => setShowModalAddSupplier(false);
  const handleShowAddSupplier = () => setShowModalAddSupplier(true);

  const handleCloseEditItem = () => setShowModalEditItem(false);

  const handleLinkClick = (e, handler) => {
    e.preventDefault();
    handler();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <img src={komar} style={{ height: "10%", width: "10%" }}></img>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle area-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Склад" id="basic-nav-dropdown">
                <NavDropdown.Item href="wh">Наличие на складе</NavDropdown.Item>
                <NavDropdown.Item
                  href="wh-in"
                  onClick={(e) => handleLinkClick(e, handleShowWhIn)}
                >
                  Приход на склад
                </NavDropdown.Item>
                <NavDropdown.Item href="wh-distr">
                  Распределение товара
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="db">Ассортимент</Nav.Link>
              <Nav.Link href="check">Ревизия склада</Nav.Link>
              <NavDropdown title="Работа с базой" id="basic-nav-dropdown">
                <NavDropdown.Item
                  href="db-add"
                  onClick={(e) => handleLinkClick(e, handleShowAddItem)}
                >
                  Добавить товар
                </NavDropdown.Item>
                <NavDropdown.Item href="spl">
                  Список поставщиков
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="spl-add"
                  onClick={(e) => handleLinkClick(e, handleShowAddSupplier)}
                >
                  Добавить поставщика
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Button
                variant="primary"
                className="me-2"
                onClick={handleShowModal}
              >
                Вход
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin
        show={showModalLogin}
        onHide={handleCloseModal}
        onLogin={handleLogin}
      />

      <ModalAddItem show={showModalAddItem} onHide={handleCloseAddItem} />
      <ModalAddSupplier
        show={showModalAddSupplier}
        onHide={handleCloseAddSupplier}
      />
      <ModalEditItem
        // show={handleEditItem}
        show={showModalEditItem}
        onHide={handleCloseEditItem}
        product={selectedProduct}
      />
      <ModalWhIn show={showModalWhIn} onHide={handleCloseWhIn} />
    </>
  );
}

export default MyNavBar;
