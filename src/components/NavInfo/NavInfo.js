import React from "react";

import { Navbar, Container } from "react-bootstrap";

import "./NavInfo.css";

import "./";
export default function NavInfo() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">
          <strong>LL1</strong>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <strong>Proyecto de Estructura de lenguajes</strong>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
