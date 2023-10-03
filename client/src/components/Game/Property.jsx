import { Col, Dropdown, DropdownButton, Alert } from "react-bootstrap";

function Property(props) {
  const property = props.property;
  return (
    <Col lg={true} sm={4} xs={6} style={{ marginBottom: 20 }}>
      <DropdownButton
        disabled={!property.values.length || props.disabled}
        size="lg"
        onSelect={(eventKey) => {
          props.guessProperty(property.name, eventKey);
        }}
        variant="warning"
        className="d-grid gap-2"
        title={property.name}
      >
        {property.values.map((v, i) => (
          <Dropdown.Item
            style={{ width: 235, fontSize: 20 }}
            eventKey={v}
            key={i}
            value={v}
          >
            {v}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Col>
  );
}

function PropertyAlert(props) {
  const attributes = props.attributes;
  return (
    <Alert variant={attributes.variant} className="text-center">
      <Alert.Heading>
        {attributes.variant === "success" ? "Good guess! " : "Bad guess "}
      </Alert.Heading>
      <p>
        Secret item's {attributes.property} is{" "}
        {attributes.variant !== "success" && " not "} {attributes.value}
      </p>
    </Alert>
  );
}

export { Property, PropertyAlert };
