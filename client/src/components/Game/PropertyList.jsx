import { Row , Spinner} from "react-bootstrap";
import { Property } from "./Property";

function PropertiesList(props) {
  const properties = props.properties;
  return (
    <>
      {props.disabled && (
        <Row>
          <Spinner
            animation="border"
            style={{ margin: "auto", marginTop: 20, marginBottom: 40}}
          />
        </Row>
      )}
      <Row style={{ marginBottom: 20 }}>
        {properties.length !== 0 &&
          properties.map((p) => (
            <Property
              key={p.id}
              property={p}
              guessProperty={props.guessProperty}
              disabled={props.disabled}
            />
          ))}
      </Row>
    </>
  );
}

export { PropertiesList };
