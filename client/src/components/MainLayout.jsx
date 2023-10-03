import {useContext} from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import UserContext from "../UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function MainLayout(props) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  return (
    <>
      <header>
        <Navbar
          sticky="top"
          variant="dark"
          bg="dark"
          expand="lg"
          className="mb-3"
        >
          <Container>
            <Navbar.Brand>
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: 30,
                }}
              >
                Guess who?
              </Link>{" "}
            </Navbar.Brand>
            <Nav>
              {!(user.id) ? (
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
              ) : (
                <>
                  <NavDropdown title={user.name}>
                    <NavDropdown.Item onClick={() => navigate("/gamehistory")}>
                      {" "}
                      Game History
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        props.handleLogout();
                        navigate("/");
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export { MainLayout };
