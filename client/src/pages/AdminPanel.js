import React, { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import AddNewPet from "../Components/Pets/AddNewPet";
import Pets from "../Components/Pets/Pets";
import api from "../utils/API";
import EditUserModal from "../Components/UserSettings/EditUserModal";

export default function AdminPanel() {
  const [editAdminModal, setEditAdminModal] = useState(false);
  const [showAllPets, setShowAllPets] = useState(true);
  const [petsArray, setPetsArray] = useState([]);
  const [addPetModal, setAddPetModal] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const openAddPetModal = () => {
    setAddPetModal((prev) => !prev);
  };

  function handleSetPetsArray(petsArray) {
    setPetsArray(petsArray);
  }

  const toggleSearchType = () => {
    setShowAllPets(!showAllPets);
  };

  const openEditAdminModal = () => {
    setEditAdminModal((prev) => !prev);
  };

  async function getAllPetsFromDB() {
    const response = await api.getAllPets();
    handleSetPetsArray(response);
  }

  useEffect(() => {
    (async () => {
      getAllPetsFromDB();
    })();
  }, [getAllPetsFromDB, showAllPets]);

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
