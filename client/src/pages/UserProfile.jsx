import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import { Card, ListGroup } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditUserModal from "../Components/UserSettings/EditUserModal";
import { UserContext } from "../Context/AuthContext";
import api from "../utils/API";

export default function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [editUserModal, setEditUserModal] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const openEditUserModal = () => {
    if (!editUserModal) {
      setEditUserModal(true);
    } else {
      setEditUserModal(false);
    }
  };

  const getUpdatedUserData = async (userId) => {
    const response = await api.getUserById(userId);
    setUser(response);
    setFirstName(response.firstName);
    setLastName(response.lastName);
    setEmail(response.email);
    setPhoneNumber(response.phoneNumber);
    setBio(response.bio);
    setFirstRender(false);
  };

  useEffect(() => {
    if (firstRender) {
      const fetchUserData = () => {
        const userId = user._id;
        getUpdatedUserData(userId);
        setFirstRender(false);
      };
      fetchUserData();
    }
  }, [firstRender]);

  return (
    <div className=" mt-5 pt-5 d-flex flex-row justify-content-center text-center ">
      <Card className="" style={{ width: "850px", height: "470px" }}>
        <Card.Header className="justify-content-center ">
          <div className="d-flex flex-row justify-content-between">
            <div></div>
            <h2 className="ms-5 ps-3 text-center text-dark">Profile</h2>
            <FontAwesomeIcon
              icon={faEdit}
              style={{ cursor: "pointer" }}
              onClick={() => openEditUserModal()}
              className="me-5 mt-2 text-dark"
              size="lg"
            ></FontAwesomeIcon>
          </div>
        </Card.Header>
        <div className="d-flex flex-row justify-content-evenly align-items-center mt-1">
          <Card.Img
            className="mx-4 d-flex flex-row justify-content-start align-items-start rounded shadow-lg"
            style={{ width: "250px", height: "240px" }}
            variant="top"
            src="https://www.placecage.com/c/250/251 cap"
          />
          <Card.Title className="text-dark ms-4 fs-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                {" "}
                <span className="pe-2">{firstName}</span>
                <span>{lastName}</span>
              </ListGroup.Item>
              <ListGroup.Item>{email}</ListGroup.Item>
              <ListGroup.Item>972-{phoneNumber}</ListGroup.Item>
            </ListGroup>
          </Card.Title>
        </div>
        <Card.Body>
          <Card.Text className="text-dark mb-0">
            <Card.Subtitle className="fs-5 text-muted pb-0">Bio:</Card.Subtitle>
            <p className="fs-5">{bio}</p>
          </Card.Text>
        </Card.Body>
      </Card>
      <EditUserModal
        setFirstRender={setFirstRender}
        editUserModal={editUserModal}
        handleModalEditUser={openEditUserModal}
      />
    </div>
  );
}
