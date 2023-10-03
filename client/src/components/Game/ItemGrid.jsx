import { Row } from "react-bootstrap";
import { Item } from "./Item";

function ItemGrid(props) {
  const items = props.items;
  return (
    <Row
      style={{
        marginTop: 20,
        marginBottom: 20,
        borderBottom: "solid",
        backgroundColor: "white",
      }}
    >
      {items.length !== 0 &&
        items.map((item) => (
          <Item key={item.id} item={item} selectGuess={props.selectGuess} />
        ))}
    </Row>
  );
}

export {ItemGrid};
