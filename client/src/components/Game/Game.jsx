import { useState, useEffect } from "react";
import { Row, Spinner } from "react-bootstrap";
import { startGame, checkProperty } from "../../API";
import { useParams } from "react-router-dom";
import { ErrorMessage } from "../ErrorMessage";
import { EndGame } from "./EndGame";
import { PropertiesList } from "./PropertyList";
import { PropertyAlert } from "./Property";
import { StartInterface } from "./StartInterface";
import { ItemGrid } from "./ItemGrid";

function Game() {
  const { difficult } = useParams();
  const [gameid, setGameID] = useState(null);
  const [items, setItems] = useState([]);
  const [propertyNames, setPropertyNames] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [guess, setGuess] = useState({});
  const [alertAttributes, setAlertAttributes] = useState(null);
  const [timer, setTimer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    if (alertAttributes) {
      setTimer(
        setTimeout(() => {
          setAlertAttributes(null);
          setTimer(null);
        }, 2000)
      );
    }
  }, [alertAttributes]);

  function computeProperties() {
    return propertyNames.map((name, index) => {
      let values = [...new Set(items.map((item) => item[name]))];
      if (values.length === 1) values = [];
      return { id: index, name, values };
    });
  }

  const initGame = async () => {
    try {
      setPlaying(true);
      const match = await startGame(difficult);
      setLoading(false);
      setGameID(match.gameID);
      setItems(match.items);
      setPropertyNames(match.propertyNames);
    } catch (error) {
      handleError(error.message);
    }
  };

  const guessProperty = async (property, value) => {
    try {
      setDisabled(true);
      const check = await checkProperty(gameid, property, value);
      setDisabled(false);
      if (timer) clearTimeout(timer);
      check
        ? setAlertAttributes({
            variant: "success",
            property: property,
            value: value,
          })
        : setAlertAttributes({
            variant: "danger",
            property: property,
            value: value,
          });
      setItems((oldItems) =>
        oldItems.filter((i) =>
          check ? i[property] === value : i[property] !== value
        )
      );
    } catch (error) {
      handleError(error.message);
    }
  };

  function selectGuess(item) {
    setGuess(item);
  }

  function handleHide() {
    setGuess({});
  }

  function handleError(message) {
    setErrMsg(message);
  }

  if (errMsg) return <ErrorMessage message={errMsg} />;
  else if (!playing) return <StartInterface initGame={initGame} />;
  else
    return (
      <>
        <EndGame
          handleHide={handleHide}
          guess={guess}
          gameid={gameid}
          handleError={handleError}
        />
        {}
        <Row style={{ marginBottom: 20, borderBottom: "solid", height: 80 }}>
          <h1 className="text-center">Let's play!</h1>
        </Row>
        {loading ? (
          <Row>
            <Spinner
              animation="border"
              variant="primary"
              style={{ margin: "auto", marginTop: 40 }}
            />
          </Row>
        ) : (
          <ItemGrid items={items} selectGuess={selectGuess} />
        )}
        <Row style={{ marginTop: 20, marginBottom: 20 }}>
          <h2 className="text-center">Select the property you want to check</h2>
        </Row>
        {alertAttributes && <PropertyAlert attributes={alertAttributes} />}
        {loading ? (
          <Row>
            <Spinner
              animation="border"
              variant="warning"
              style={{ margin: "auto", marginTop: 40 }}
            />
          </Row>
        ) : (
          <PropertiesList
            properties={computeProperties()}
            disabled={disabled}
            guessProperty={guessProperty}
          />
        )}

        <Row style={{ marginBottom: 500 }}></Row>
      </>
    );
}

export { Game };
