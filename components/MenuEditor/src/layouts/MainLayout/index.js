import {Container, Row} from "react-bootstrap";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Row>
        { children }
      </Row>
    </Container>
  )
}

export default MainLayout;