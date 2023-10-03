import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const navigate = useNavigate();

  return (
    <>
      <Row style={{ marginBottom: 20, borderBottom:"solid", height:80 }}>
        <h1 className="text-center">Chose the difficult!</h1>
      </Row>
      <Row style={{marginTop:100}}>
        <Col className="d-grid gap-2">
          <Button variant="success" size="lg" onClick={()=>{navigate("/game/1")}}>
            SIMPLE
          </Button>
        </Col>

        <Col className="d-grid gap-2">
          <Button variant="warning" size="lg" onClick={()=>{navigate("/game/2")}}>
            MEDIUM
          </Button>
        </Col>
        <Col className="d-grid gap-2">
          <Button variant="danger" size="lg" onClick={()=>{navigate("/game/3")}}>
            HARD
          </Button>
        </Col>
      </Row>
    </>
  );
}

export { Lobby };
