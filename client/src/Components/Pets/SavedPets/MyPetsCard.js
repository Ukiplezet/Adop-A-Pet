import React from "react";
import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import MyPetModal from "./MyPetModal";

export default function PetsCard({ pet, getSavedPets }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { type, name, breed, picture, adoptionStatus, color, id } = pet;

  const openModalHandler = () => {
    if (!isFormOpen) {
      setIsFormOpen(true);
    } else {
      setIsFormOpen(false);
    }
  };

  return (
    <Col className="py-3">
      {!isFormOpen ? (
        <div className="">
          <Card
            style={{ width: "270px ", height: "400px" }}
            className="d-flex flex-row-nowrap ms-3 py-3 justify-content-center align-items-center text-center"
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
              </Card.Footer>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <MyPetModal
          handleOpenEditForm={openModalHandler}
          getSavedPets={getSavedPets}
          pet={pet}
          id={id}
        />
      )}
    </Col>
  );
}
