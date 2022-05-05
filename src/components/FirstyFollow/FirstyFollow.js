import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import "./FirstyFollow.css";

export default function FirstyFollow(props) {
  const { prodPrimeros, primeros } = props;

  /*
  const listaPrimeros = prodPrimeros.map((prod, index) => (
    <ListGroup.Item key={prodPrimeros[index].toString()}>
      {`Prim(${prodPrimeros[index]})->` + primeros[index]}
    </ListGroup.Item>
  ));
  */
  for (var i = 0; i < prodPrimeros.length; i++) {
    console.log("Prim(" + prodPrimeros[i] + ") → " + primeros[i]);
  }

  return (
    <div>
      <div className="cards">
        <div className="primeros">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Primeros</Card.Title>
              <Card.Text>
                <ListGroup>{}</ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="siguientes">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Siguientes</Card.Title>
              <Card.Text>
                <ListGroup>{}</ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
