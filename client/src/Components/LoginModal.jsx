import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Layout/style.css";
import { Form } from "react-bootstrap";
import api from "../utils/API";
import { UserContext } from "../Context/AuthContext";
import UserProvider from "../Context/AuthContext";

const LoginModal = (props) => {
  const { user, login, logout, setUser } = useContext(UserContext);
  const history = useHistory();
  const [registerView, setRegisterView] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();

  const toggleView = (value) => {
    setRegisterView(value);
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setPhoneNumber("");
  };

  const handleSignupSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (password === passwordConfirm) {
      try {
        const response = await api.signUpUser({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        });
        await settingLoggedUserContext(response);
        const loggedId = response._id;
        props.handleModalOpen();
        history.push(`/${loggedId}`);
      } catch (err) {
        return err.message;
      }
    } else {
      alert("password doesn't match!");
      logout();
    }
    setLocalStorage();
  };

  const handleLoginSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const response = await api.loginUser({
        email,
        password,
      });
      if (response.role === "admin") {
        settingLoggedUserContext(response);
        const loggedId = response._id;
        props.handleModalOpen();
        history.push(`/adminpanel/${loggedId}`);
        alert("admin logged in");
      } else {
        await settingLoggedUserContext(response);
        const loggedId = response._id;
        props.handleModalOpen();
        history.push(`/${loggedId}`);
      }
    } catch (err) {
      return err;
    }
    setLocalStorage();
  };
  const setLocalStorage = () => {
    const hours = 1;
    const now = new Date().getTime();
    const setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear();
        logout(user);
        localStorage.setItem("setupTime", now);
        history.push("/");
      }
    }
  };

  const settingLoggedUserContext = async (response) => {
    const loggedUser = {
      ...user,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      _id: response._id,
      bio: response.bio,
      phoneNumber: response.phoneNumber,
      auth: response.token,
      token: response.token,
      role: response.role,
    };
    login(user);
    localStorage.setItem("token", loggedUser.token);
    localStorage.setItem("id", loggedUser._id);

    return setUser(loggedUser);
  };

  return (
    <UserProvider>
      <Modal show={props.modalOpen} onHide={props.handleModalOpen}>
        {" "}
        {!registerView ? (
          <form
            className=" w-1/2 flex flex-col"
            onSubmit={(e, email) => {
              handleLoginSubmit(e, email);
              setRegisterView(false);
            }}
          >
            <Modal.Header className="justify-content-center">
              <Modal.Title>Login:</Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
              <label className=" ">Email:</label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className=""
                type="email"
              />
              <label className="">Password:</label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className=""
                type="password"
              />
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="danger" onClick={props.handleModalOpen}>
                Cancel
              </Button>
              <div className="d-flex flex-row">
                <p onClick={() => toggleView(true)} className=" mx-2 p-button">
                  Need to Register?
                </p>
                <Button variant="primary" className="mx-2" type="submit">
                  Submit
                </Button>
              </div>
            </Modal.Footer>
          </form>
        ) : (
          <form
            className=" flex-col "
            onSubmit={(e) => {
              handleSignupSubmit(e);
              // setRegisterView(false);
            }}
          >
            <Modal.Header className="justify-content-center">
              <Modal.Title>Register:</Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
              <label className="">First Name:</label>
              <Form.Control
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                className=""
                type="text"
              />
              <label className="">Last Name:</label>
              <Form.Control
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                className=""
                type="text"
              />
              <label className="">Email:</label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className=""
                type="email"
              />
              <label className="">Password:</label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className=""
                type="password"
              />
              <label className="">Confirm Password:</label>
              <Form.Control
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
                name="passwordConfirm"
                className=""
                type="password"
              />
              <label className=" ">Phone Number:</label>
              <Form.Control
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="phoneNumber"
                className="phoneNumber"
                type="number"
              />
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="danger" onClick={props.handleModalOpen}>
                Cancel
              </Button>
              <div className="d-flex flex-row">
                <p onClick={() => toggleView(false)} className=" mx-2 p-button">
                  Already Registered?
                </p>
                <Button variant="primary" type="submit" className="mx-2">
                  Register
                </Button>
              </div>
            </Modal.Footer>
          </form>
        )}
      </Modal>
    </UserProvider>
  );
};

export default LoginModal;
