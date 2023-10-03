import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function ErrorMessage(props) {
  return (
    <>
      <Alert variant="danger">
        <h1>{props.message ? props.message : "Something went wrong"}</h1>
        <p>
          <Link to="/">Please go back to the home page</Link>
        </p>
      </Alert>
    </>
  );
}

export {ErrorMessage};