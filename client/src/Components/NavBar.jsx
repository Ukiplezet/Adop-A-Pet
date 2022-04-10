import React, { useState, useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import LoginModal from "../Components/LoginModal";
import "../Layout/style.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../Context/AuthContext";

const NavBar = (props) => {
  const { user, logout } = useContext(UserContext);

  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    if (!modalOpen) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        className="py-2 fixed-top d-flex flex-row-nowrap justify-content-evenly "
      >
        <Container className="sticky-top d-flex justify-content-between m-0 p-0">
          <FontAwesomeIcon
            icon={faBars}
            id="toggle"
            className={"sidebar-opener d-flex ms-2"}
            onClick={props.click}
          >
            &#8801;
          </FontAwesomeIcon>
          <Nav className="d-flex py-0 justify-content-between">
            <Navbar.Brand>
              {user.role === "user" ? (
                <Link
                  className="text-light text-decoration-none app-banner ms-4 fs-3 py-0 my-0"
                  to={`/${user._id}`}
                  href={`/${user._id}`}
                  onClick={() => {
                    history.push(`/${user._id}`);
                  }}
                >
                  Adopt-A-Pet
                </Link>
              ) : user.role === "admin" ? (
                <Link
                  className="text-light text-decoration-none app-banner ms-4 fs-3 py-0 my-0"
                  to={`/${user._id}`}
                  href={`/${user._id}`}
                  onClick={() => {
                    history.push(`/${user._id}`);
                  }}
                >
                  Adopt-A-Pet
                </Link>
              ) : (
                <Link
                  className="text-light text-decoration-none app-banner ms-4 fs-3 py-0 my-0"
                  to="/"
                  href="/"
                >
                  Adopt-A-Pet
                </Link>
              )}
            </Navbar.Brand>
          </Nav>
          {user.role === "user" ? (
            <Button
              className="d-inline-flex  "
              variant="primary"
              onClick={() => {
                history.push("/");
                logout();
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          ) : user.role === "admin" ? (
            <Button
              className="d-inline-flex  "
              variant="primary"
              onClick={() => {
                history.push("/");
                logout();
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              className="d-inline-flex  "
              variant="primary"
              type="submit"
              onClick={() => openModalHandler()}
            >
              Login
            </Button>
          )}
        </Container>
      </Navbar>
      <LoginModal modalOpen={modalOpen} handleModalOpen={openModalHandler} />
    </>
  );
};

export default NavBar;
