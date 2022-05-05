import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import "./FirstyFollow.css";

export default function FirstyFollow(props) {
  const { listPrimeros } = props;

  const listaPrimeros = listPrimeros.map((prod) => (
    <ListGroup.Item key={prod.toString()}>{prod.toString()}</ListGroup.Item>
  ));

  return (
    <div>
      <div className="cards">
        <div className="primeros">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Primeros</Card.Title>
              <Card.Text>
                <ListGroup>{listaPrimeros}</ListGroup>
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
