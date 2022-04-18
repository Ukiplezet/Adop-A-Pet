import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import { Card, ListGroup } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditUserModal from "../Components/UserSettings/EditUserModal";
import { UserContext } from "../Context/AuthContext";
import api from "../utils/API";
import Spinner from "../Components/Spinner/Spinner";

export default function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const [editUserModal, setEditUserModal] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const openEditUserModal = () => {
    if (!editUserModal) {
      setEditUserModal(true);
    } else {
      setEditUserModal(false);
    }
  };

  const getUpdatedUserData = async (userId) => {
    const response = await api.getUserById(userId);
    if (response) {
      setUser(response);
      setShowLoadingSpinner(false);
    }
  };
  const fetchUserData = async () => {
    const userId = user._id;
    getUpdatedUserData(userId);
  };

  useEffect(() => {
    (async () => {
      await fetchUserData();
    })();
  }, []);

  const loadUserData = () => {
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
              src="https://www.placecage.com/c/250/251"
            />
            <Card.Title className="text-dark ms-4 fs-3">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {" "}
                  <span className="pe-2">{user.firstName}</span>
                  <span>{user.lastName}</span>
                </ListGroup.Item>
                <ListGroup.Item>{user.email}</ListGroup.Item>
                <ListGroup.Item>972-{user.phoneNumber}</ListGroup.Item>
              </ListGroup>
            </Card.Title>
          </div>
          <Card.Body>
            <Card.Text className="text-dark mb-0">
              <Card.Subtitle className="fs-5 text-muted pb-0">
                Bio:
              </Card.Subtitle>
              <p className="fs-5">{user.bio}</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <EditUserModal
          setShowLoadingSpinner={setShowLoadingSpinner}
          editUserModal={editUserModal}
          handleModalEditUser={openEditUserModal}
          fetchUserData={fetchUserData}
        />
      </div>
    );
  };

  return (
    <>
      {showLoadingSpinner ? (
        <div className="d-flex justify-content-center mt-5 pt-5">
          <Spinner />
        </div>
      ) : (
        <div>{loadUserData()}</div>
      )}
    </>
  );
}
