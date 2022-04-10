import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row,DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./sidebar.css";
import { UserContext } from "../../Context/AuthContext";

const Sidebar = (props) => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const [sidebarClass, setSidebarClass] = useState(props.sidebar);

  const closeHandler = (e) => {
    e.preventDefault();
    setSidebarClass("sidebar close");
    setTimeout(() => {
      props.close();
    }, 1000);
  };

  if (user.role === "user") {
    return (
      <div className="d-flex flex-col">
        <Row className={`d-flex flex-col align-items-start ${sidebarClass}`}>
          <div>
            <Row className="d-flex flex-row  ">
              <ul className="navbar-nav mt-5">
                <li className="nav-item active mt-5">
                  <Link
                    className="navbar-brand text-light fs-4"
                    to="/"
                    href="/"
                    onClick={(e) => {
                      closeHandler(e);
                      history.push(`/${user._id}`);
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item my-2 mb-5">
                  <Link
                    className="navbar-brand text-light fs-4"
                    to="/search"
                    href="/search"
                    onClick={(e) => {
                      closeHandler(e);
                      history.push(`/search/${user._id}`);
                    }}
                  >
                    Search
                  </Link>
                </li>
                <DropdownButton
                 className="ms-0 ps-0 my-2"
                 size="lg"
        as={ButtonGroup}
        key="end"
        id={`dropdown-button-drop-end`}
        drop="end"
        title={`Profile`}
      >
        <Dropdown.Item eventKey="1" 
        onClick={(e) => {
                          closeHandler(e);
                          history.push(`/userprofile/${user._id}`);
                        }}
        > User Panel</Dropdown.Item>
        <Dropdown.Item eventKey="2"
        onClick={(e) => {
                          closeHandler(e);
                          history.push(`/savedpets/${user._id}`);
                        }}
        >My Saved Pets</Dropdown.Item>
      </DropdownButton>
              </ul>
            </Row>
          </div>
        </Row>
      </div>
    );
  } else if (user.role === "admin") {
    return (
      <div className="d-flex flex-col">
        <Row className={`d-flex flex-col align-items-start ${sidebarClass}`}>
          <div>
            <Row className="d-flex flex-row  ">
              <ul className="navbar-nav mt-5">
                <li className="nav-item active mt-5">
                  <Link
                    className="navbar-brand text-light fs-4"
                    to="/"
                    href="/"
                    onClick={(e) => {
                      closeHandler(e);
                      history.push(`/${user._id}`);
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item my-2 ">
                  <Link
                    className="navbar-brand text-light fs-4"
                    to="/search"
                    href="/search"
                    onClick={(e) => {
                      closeHandler(e);
                      history.push(`/search/${user._id}`);
                    }}
                  >
                    Search
                  </Link>
                </li>
              </ul>
            </Row>
          </div>
          <Row className="d-flex flex-row ">
            <ul className="navbar-nav mt-5 pt-5">
              <li className="nav-item active mt-5 pt-5 ms-4">
                <Link
                  className="navbar-brand text-light"
                  onClick={(e) => {
                    closeHandler(e);
                    history.push(`/adminpanel/${user._id}`);
                  }}
                  to="/adminpanel"
                  href="/adminpanel"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </Row>
        </Row>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-col">
        <Row className={`d-flex flex-col align-items-start ${sidebarClass}`}>
          <div>
            <Row className="d-flex flex-row  ">
              <ul className="navbar-nav mt-5">
                <li className="nav-item active mt-5">
                  <Link
                    className="navbar-brand text-light fs-4"
                    to="/"
                    href="/"
                    onClick={(e) => {
                      closeHandler(e);
                      history.push("/");
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item my-2 ">
                  <Link
                    className="navbar-brand text-light fs-4"
                    to="/search"
                    href="/search"
                    onClick={(e) => {
                      history.push("/search");
                      closeHandler(e);
                    }}
                  >
                    Search
                  </Link>
                </li>
              </ul>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
};

export default Sidebar;
