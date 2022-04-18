import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { FloatingLabel, Form, Row, Button } from "react-bootstrap";
import api from "../../utils/API";
import React, { useState, useContext } from "react";
import { UserContext } from "../../Context/AuthContext";

export default function EditUserModal(props) {
  const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [passwordConfirm, setPasswordConfirm] = useState(user.passwordConfirm);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [bio, setBio] = useState(user.bio);

  const handleUpdateUserData = async () => {
    const userId = user._id;
    if (password === "") {
      alert("Please enter password and passowrd confirmation");
    }
    if (password === passwordConfirm) {
      props.setShowLoadingSpinner(true);
      try {
        const response = await api.updateUserData({
          firstName,
          lastName,
          email,
          password,
          bio,
          phoneNumber,
          userId,
        });
        setUser(response);
        if (user.role === "user") {
          props.fetchUserData();
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please Confirm Your Password To Save Changes!");
    }
  };

  return (
    <Modal
      show={props.editUserModal}
      onHide={props.handleModalEditUser}
      className="d-flex flex-col"
    >
      <form
        className=" "
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateUserData();
          props.handleModalEditUser();
        }}
      >
        <Modal.Header className="justify-content-center">
          <Modal.Title>Edit Profile:</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-col">
          <Row>
            <Row className="w-50 me-2">
              <FloatingLabel
                controlId="floatingInput"
                label="Change first name"
                className="mb-3"
              >
                <Form.Control
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  type="text"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Change last name"
                className="mb-3"
              >
                <Form.Control
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  type="text"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Change email address"
                className="mb-3"
              >
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                />
              </FloatingLabel>
            </Row>
            <Row className="w-50 ms-2">
              <FloatingLabel
                controlId="floatingPassword"
                label="Enter new password"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-3"
                controlId="floatingPassword"
                label="Repeat new password"
              >
                <Form.Control
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  name="passwordConfirm"
                  type="password"
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-3"
                controlId="floatingPhoneNumber"
                label="Change Phone number"
              >
                <Form.Control
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name="phoneNumber"
                  type="number"
                />
              </FloatingLabel>
            </Row>
            <FloatingLabel
              className="mb-3"
              controlId="floatingBio"
              label="Update Bio"
            >
              <Form.Control
                value={bio}
                as="textarea"
                row={8}
                onChange={(e) => setBio(e.target.value)}
                name="bio"
                type="text"
              />
            </FloatingLabel>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="danger" onClick={props.handleModalEditUser}>
            Cancel
          </Button>
          <div className="d-flex flex-row">
            <Button variant="primary" type="submit" className="mx-2">
              Save
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
