import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { getGameHistory } from "../API";
import { Table, Row, Spinner, Col, Button } from "react-bootstrap";
import { ErrorMessage } from "./ErrorMessage";

function MatchHistory() {
  const user = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHistory() {
      try {
        const history = await getGameHistory();
        setHistory(history);
        setLoading(false);
      } catch (error) {
        setErrMsg(error.message);
      }
    }
    getHistory();
  }, [user]);

  if (errMsg) return <ErrorMessage message={errMsg} />;
  else if (loading)
    return (
      <Row>
        <Spinner
          animation="border"
          style={{ margin: "auto", marginTop: 150 }}
        />
      </Row>
    );
  else
    return (
      <>
        <Row style={{ marginBottom: 20, borderBottom: "solid", height: 80 }}>
          <Col style={{ textAlign: "left" }}>
            <h1>{user.name} game history</h1>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button variant="info"  active style={{marginTop: 9, marginRight:30}}>
              Total Score:{" "}
              {history
                .map((g) => g.score)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )}
            </Button>
          </Col>{" "}
        </Row>

        <Table striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Difficult</th>
              <th>Secret</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {history.lenght !== 0 &&
              history.map((game, index) => (
                <GameRow key={game.id} game={game} index={index} />
              ))}
          </tbody>
        </Table>
      </>
    );
}

function GameRow(props) {
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{props.game.date}</td>
      <td>{props.game.difficult}</td>
      <td>{props.game.secret}</td>
      <td>{props.game.score}</td>
    </tr>
  );
}

export { MatchHistory };
