import React, { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import AddNewPet from "../Components/Pets/AddNewPet";
import Pets from "../Components/Pets/Pets";
import api from "../utils/API";
import EditUserModal from "../Components/UserSettings/EditUserModal";
import UsersList from "../Components/UserSettings/UsersList";

export default function AdminPanel() {
  const [editAdminModal, setEditAdminModal] = useState(false);
  const [showAllPets, setShowAllPets] = useState(false);
  const [petsArray, setPetsArray] = useState([]);
  const [addPetModal, setAddPetModal] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [usersArray, setUsersArray] = useState([]);

  const openAddPetModal = () => {
    setAddPetModal((prev) => !prev);
  };

  function handleSetPetsArray(petsArray) {
    setPetsArray(petsArray);
  }

  const toggleSearchType = () => {
    setShowAllPets(!showAllPets);
  };

  const toggleShowUsers = () => {
    setShowAllUsers(!showAllUsers);
  };

  const openEditAdminModal = () => {
    setEditAdminModal((prev) => !prev);
  };

  const getAllPetsFromDB = async () => {
    const response = await api.getAllPets();
    handleSetPetsArray(response);
  };

  const getAllUsersFromDB = async () => {
    const role = localStorage.getItem("role");
    const response = await api.getAllUsers(role);
    handleSetUsersArray(response.data);
  };
  const handleSetUsersArray = (usersArray) => {
    setUsersArray(usersArray);
  };
  useEffect(() => {
    (async () => {
      await getAllPetsFromDB();
    })();
  }, []);

  return (
    <div className="mt-5 pt-2">
      <div className="mt-3">
        <h3 className="">ADMIN DASHBOARD</h3>
        <Col className="mt-3">
          <Button
            className="d-inline-flex  me-2"
            variant="primary"
            type="submit"
            onClick={() => openAddPetModal()}
          >
            Add New Pet
          </Button>
          <Button
            className="d-inline-flex  me-2"
            variant="primary"
            type="submit"
            onClick={() => openEditAdminModal()}
          >
            Edit Admin Profile
          </Button>
          {showAllPets ? (
            <Button
              className="d-inline-flex  ms-2"
              variant="primary"
              type="submit"
              to="/search"
              href="/search"
              onClick={(e) => {
                e.preventDefault();
                toggleSearchType();
              }}
            >
              Hide All Pets
            </Button>
          ) : (
            <Button
              className="d-inline-flex  ms-2"
              variant="primary"
              type="submit"
              to="/search"
              href="/search"
              onClick={(e) => {
                e.preventDefault();
                toggleSearchType();
              }}
            >
              Show All Pets
            </Button>
          )}
          {showAllUsers ? (
            <Button
              className="d-inline-flex  ms-2"
              variant="primary"
              type="submit"
              to="/search"
              href="/search"
              onClick={(e) => {
                e.preventDefault();
                toggleShowUsers();
              }}
            >
              Hide All Users
            </Button>
          ) : (
            <Button
              className="d-inline-flex  ms-2"
              variant="primary"
              type="submit"
              to="/search"
              href="/search"
              onClick={(e) => {
                e.preventDefault();
                toggleShowUsers();
                getAllUsersFromDB();
              }}
            >
              Show All Users
            </Button>
          )}
          <AddNewPet
            addPetModal={addPetModal}
            handleModalAddPet={openAddPetModal}
          />
          {showAllPets ? (
            <>
              <hr />
              <Pets
                pets={petsArray}
                setPetsArray={setPetsArray}
                getAllPetsFromDB={getAllPetsFromDB}
                handleSetPetsArray={handleSetPetsArray}
              />
            </>
          ) : (
            <>
              <hr />
            </>
          )}
          {showAllUsers ? (
            <>
              <hr />
              <UsersList
                users={usersArray}
                setUsersArray={setUsersArray}
                getAllUsersFromDB={getAllUsersFromDB}
                handleSetUsersArray={handleSetUsersArray}
              />
            </>
          ) : (
            <>
              <hr />
            </>
          )}
        </Col>
        <EditUserModal
          setShowLoadingSpinner={setShowLoadingSpinner}
          editUserModal={editAdminModal}
          handleModalEditUser={openEditAdminModal}
        />
      </div>
    </div>
  );
}
