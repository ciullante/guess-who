import { Col, Figure } from "react-bootstrap";
import "./hover.css";

const URL = "http://localhost:3000";

function Item(props) {
  const item = props.item;
  return (
    <Col
      className="d-flex"
      md={2}
      xs={6}
      style={{
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Figure
        className="hover11"
        onClick={() => {
          props.selectGuess(item);
        }}
      >
        <Figure.Image
          style={{
            width: 90
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.25)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
          }}
          src={URL + item.path}
        />
        <Figure.Caption
          style={{
            textAlign: "center",
            fontSize: 20,
            color: "black",
            marginTop:10,
          }}
        >
          {item.name}
        </Figure.Caption>
      </Figure>
    </Col>
  );
}

export { Item };
