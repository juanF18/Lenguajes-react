import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import "./TermyNoTerm.css";

export default function TermyNoTerm(props) {
  const { terminales, noTerminales, ll1 } = props;

  const listaTerminales = terminales.map((char) => (
    <ListGroup.Item key={char.toString()}>{char.toString()}</ListGroup.Item>
  ));

  const listaNoTerminales = noTerminales.map((char) => (
    <ListGroup.Item key={char.toString()}>{char.toString()}</ListGroup.Item>
  ));

  const listaOrganizada = ll1.map((char) => (
    <ListGroup.Item key={char.toString()}>{char.toString()}</ListGroup.Item>
  ));
  return (
    <div className="cards">
      <div className="ll1">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Gramatica Organizada</Card.Title>
            <Card.Text>
              <ListGroup>{listaOrganizada}</ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="terminales">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Terminales</Card.Title>
            <Card.Text>
              <ListGroup>{listaTerminales}</ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="noterminales">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>No Terminales</Card.Title>
            <Card.Text>
              <ListGroup>{listaNoTerminales}</ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
