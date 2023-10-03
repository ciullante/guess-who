import { Button, Col, Row } from "react-bootstrap";

function StartInterface({ initGame }) {
  return (
    <>
      <Row style={{ marginBottom: 20, borderBottom: "solid", height: 80 }}>
        <h1 className="text-center">Are you ready?</h1>
      </Row>

      <Row>
        <Col
          style={{
            textAlign: "center",
          }}
        >
          <Button
            variant="warning"
            size="lg"
            style={{ width: 300 }}
            onClick={initGame}
          >
            START GAME
          </Button>
        </Col>
      </Row>
    </>
  );
}

export { StartInterface };
