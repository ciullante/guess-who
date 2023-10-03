import { useState } from "react";
import { Button, Modal, Spinner, Row } from "react-bootstrap";
import { checkGuess } from "../../API";
import { useNavigate } from "react-router-dom";

function EndGame(props) {
  const [result, setResult] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const makeGuess = async () => {
    try {
      setDisabled(true);
      const res = await checkGuess(props.gameid, props.guess);
      setResult(res);
      setDisabled(false);
    } catch (error) {
      props.handleError(error.message);
    }
  };

  if (result)
    return (
      <Modal
        show={props.guess.id}
        onHide={() => {
          props.handleHide();
        }}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            {result.check ? "Winner Winner Chicken Dinner" : "Looooser!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", fontSize: 20, height: 110 }}>
          <p>
            <span style={{ color: "red" }}>{result.secretItem.name}</span> is
            the right guess!
          </p>
          <p>
            {" "}
            Score :{" "}
            {result.check ? (
              <span style={{ color: "green" }}>{result.score}</span>
            ) : (
              <span style={{ color: "red" }}>{result.score}</span>
            )}
          </p>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button size="lg" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </Modal.Footer>
      </Modal>
    );
  else
    return (
      <Modal
        show={props.guess.id}
        onHide={() => {
          props.handleHide();
        }}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", fontSize: 20, height: 68 }}>
          {disabled ? (
            <Row>
              <Spinner
                animation="border"
                variant="primary"
                style={{ margin: "auto", marginTop: 0, marginBottom: 0 }}
              />
            </Row>
          ) : (
            <p>
              Your guess is{" "}
              <span style={{ color: "red" }}>{props.guess.name}</span>{" "}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button disabled={disabled} size="lg" onClick={makeGuess}>
            Yes
          </Button>
          <Button
            disabled={disabled}
            size="lg"
            variant="secondary"
            onClick={() => props.handleHide()}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export { EndGame };
