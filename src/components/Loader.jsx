import { Spinner, Row, Col } from "react-bootstrap";

function Loader() {
  return (
    <Row className="justify-content-center mx-auto">
      <Col xs={6} md={4}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
}

export default Loader;
