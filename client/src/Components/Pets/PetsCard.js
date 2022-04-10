import React from "react";
import { useState, useContext } from "react";
import PetModal from "./PetModal";
import EditPetsModal from "./EditPetsModal";
import { Card, Row, Col, Button } from "react-bootstrap";
import api from "../../utils/API";
import { UserContext } from "../../Context/AuthContext";

export default function PetsCard({ pet, getAllPetsFromDB, setPetsArray }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const {
    type,
    name,
    breed,
    picture,
    adoptionStatus,
    color,
    _id,
  } = pet;
  const { user } = useContext(UserContext);

  const openEditModalHandler = () => {
    if (!isEditFormOpen) {
      setIsEditFormOpen(true);
    } else {
      setIsEditFormOpen(false);
    }
  };

  const openModalHandler = () => {
    if (!isFormOpen) {
      setIsFormOpen(true);
    } else {
      setIsFormOpen(false);
    }
  };

  const deletePet = async (e) => {
    e.preventDefault();
    let confirmDelete = window.confirm(`Are you sure you wish to remove ${pet.name} from the database?`);
    if(confirmDelete){
      await api.deletePetFromDB(user, pet);
    } 
  };

  if (user.email === "") {
    return (
      <Col className="py-3">
        {!isFormOpen ? (
          <div className="">
            <Card
              style={{ width: "270px ", height: "400px" }}
              className="d-flex flex-row-nowrap ms-3 py-3 justify-content-center text-center"
            >
              <Card.Img
                style={{ width: "100px", height: "100px" }}
                variant="top"
                src={picture}
                className="d-flex flex-col align-self-center text-center"
              />
              <Card.Title className="pt-4">Name:{name}</Card.Title>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <i>Type: {type}</i>
                    <i>Breed: {breed}</i>
                    <i>Status: {adoptionStatus}</i>
                    <i>Color: {color}</i>
                  </Row>
                </Card.Text>
                <Card.Footer>
                  <div>
                    <Button
                      className="w-50 ms-2"
                      onClick={(e) => {
                        e.preventDefault();
                        openModalHandler();
                      }}
                      type="submit"
                    >
                      More Details
                    </Button>
                  </div>
                </Card.Footer>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <>
            <PetModal
              setPetsArray={setPetsArray}
              openModalHandler={openModalHandler}
              pet={pet}
              id={_id}
            />
          </>
        )}
      </Col>
    );
  }
  if (user.role === "user") {
    return (
      <Col className="py-3">
        {!isFormOpen ? (
          <div className="">
            <Card
              style={{ width: "270px ", height: "400px" }}
              className="d-flex flex-row-nowrap ms-3 py-3 justify-content-center text-center"
            >
              <Card.Img
                style={{ width: "100px", height: "100px" }}
                variant="top"
                src={picture}
                className="d-flex flex-col align-self-center text-center"
              />
              <Card.Title className="pt-4">Name:{name}</Card.Title>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <i>Type: {type}</i>
                    <i>Breed: {breed}</i>
                    <i>Status: {adoptionStatus}</i>
                    <i>Color: {color}</i>
                  </Row>
                </Card.Text>
                <Card.Footer>
                  <div>
                    <Button
                      className="w-50 ms-2"
                      onClick={(e) => {
                        e.preventDefault();
                        openModalHandler();
                      }}
                      type="submit"
                    >
                      More Details
                    </Button>
                  </div>
                </Card.Footer>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <>
            <PetModal
              setPetsArray={setPetsArray}
              openModalHandler={openModalHandler}
              pet={pet}
              id={_id}
            />
          </>
        )}
      </Col>
    );
  }

  if (user.role === "admin") {
    return (
      <>
        <Card
          style={{ width: "270px ", height: "400px" }}
          className="d-flex flex-row-nowrap ms-3 py-3 justify-content-evenly text-center"
        >
          <Card.Img
            style={{ width: "100px", height: "100px" }}
            variant="top"
            src={picture}
            className="d-flex flex-col align-self-center text-center"
          />
          <Card.Title className="pt-4">Name: {name}</Card.Title>
          <Card.Body>
            <Card.Text>
              <Row>
                <i>Type: {type}</i>
                <i>Breed: {breed}</i>
                <i>Status: {adoptionStatus}</i>
                <i>Color: {color}</i>
              </Row>
            </Card.Text>
            <Card.Footer>
              <Button
                className="deleteBtn me-3"
                onClick={async (e) => {
                  await deletePet(e);
                }}
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  openEditModalHandler();
                }}
              >
                Edit Pet
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>

        <EditPetsModal
          isEditFormOpen={isEditFormOpen}
          getAllPetsFromDB={getAllPetsFromDB}
          openEditModalHandler={openEditModalHandler}
          pet={pet}
          id={_id}
        />
      </>
    );
  }
}
