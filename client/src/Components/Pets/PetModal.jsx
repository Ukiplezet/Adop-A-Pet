import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../Context/AuthContext";
import { useContext } from "react";
import api from "../../utils/API";
import axios from "axios";
import "../../Layout/style.css";

export default function PetModal({ setPetsArray, openModalHandler, pet }) {
  const { user } = useContext(UserContext);

  const {
    type,
    name,
    breed,
    picture,
    adoptionStatus,
    height,
    weight,
    color,
    bio,
    dietery,
  } = pet;

  const setPetAdoption = async (pet) => {
    const status = "Adopted";
    pet.adoptionStatus = status;
    pet.owner = user._id;
    await savePetToMyList(pet);
    await api.adoptOrFosterPet(status, pet, user);
  };

  const setPetFoster = async (pet) => {
    const status = "Fostered";
    openModalHandler();
    pet.adoptionStatus = status;
    pet.owner = user._id;
    await savePetToMyList(pet);
    await api.adoptOrFosterPet(status, pet, user);
  };
  const savePetToMyList = async (pet) => {
    openModalHandler();
    await api.savePet(pet, user);
  };

  const getAllPets = async () => {
    const response = await axios.get("http://localhost:5500/pet");
    setPetsArray(response.data);
  };

  return (
    <div>
      <Modal
        dialogClassName="my-pet-modal"
        className=""
        show={openModalHandler}
        onHide={openModalHandler}
      >
        <Card className="d-flex flex-row-nowrap pt-3 justify-content-start">
          <Col className="d-flex flex-col">
            <Card.Img
              style={{ width: "600px", height: "500px" }}
              variant="top"
              src={picture}
              alt={type}
              className="d-flex flex-col ms-4 ps-3 my-4 align-self-center "
            />
            <Card.Body className=" ms-2 pt-4">
              <Card.Text className="">
                <Row className=" fs-5">
                  <Card.Title className="">
                    <strong>Name: </strong>
                    {name}
                  </Card.Title>
                  <i>
                    <strong>Type:</strong> {type}
                  </i>
                  <i>
                    <strong>Breed:</strong> {breed}
                  </i>
                  <i>
                    <strong>Status:</strong> {adoptionStatus}
                  </i>
                  <i>
                    <strong>Color:</strong> {color}
                  </i>
                  <div>
                    <i>
                      <strong>Bio: </strong>
                      <i>{bio}</i>
                    </i>
                    <i className="">
                      <strong>Dietary Restricions: </strong>
                      <i>{dietery}</i>
                    </i>
                  </div>
                  <Col className="d-flex flex-row justify-content-evenly mt-1">
                    <i>
                      <strong>Height:</strong> {height}
                    </i>
                    <i>
                      <strong>Weight:</strong> {weight}
                    </i>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Col>
          <Card.Footer>
            {user.role === "user" ? (
              <Row>
                {!pet.owner ? (
                  <Col className="flex-row d-flex pb-0 justify-content-center">
                    <>
                      <Button
                        className=" me-2"
                        onClick={async () => {
                          await savePetToMyList(pet);
                          await getAllPets();
                        }}
                      >
                        Save Pet
                      </Button>
                      <Button
                        className="btn-success ms-2"
                        onClick={async () => {
                          await setPetAdoption(pet);
                          await getAllPets();
                          await savePetToMyList(pet);
                        }}
                      >
                        Adopt Pet
                      </Button>
                      <Button
                        className="btn-info ms-2"
                        onClick={async () => {
                          await setPetFoster(pet);
                          await getAllPets();
                        }}
                      >
                        Foster Pet
                      </Button>
                    </>
                  </Col>
                ) : pet.owner === user._id ||
                  (!pet.owner && adoptionStatus === "Fostered") ? (
                  <Col className="flex-row d-flex pb-0 justify-content-center">
                    {adoptionStatus === "Adopted" ? (
                      <>
                        <Button
                          className=" me-2"
                          onClick={async () => {
                            await savePetToMyList(pet);
                            await getAllPets();
                          }}
                        >
                          Save Pet
                        </Button>
                      </>
                    ) : (
                      <Col className="flex-row d-flex pb-0 justify-content-center">
                        {adoptionStatus === "Fostered" ? (
                          <>
                            <Button
                              className=" me-2"
                              onClick={async () => {
                                await savePetToMyList(pet);
                                await getAllPets();
                              }}
                            >
                              Save Pet
                            </Button>
                            <Button
                              className="btn-success ms-2"
                              onClick={async () => {
                                await setPetAdoption(pet);
                                await getAllPets();
                                await savePetToMyList(pet);
                              }}
                            >
                              Adopt Pet
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </Col>
                    )}
                  </Col>
                ) : (
                  <Col className="flex-row d-flex pb-0 justify-content-center">
                    <Button
                      className=" me-2"
                      onClick={async () => {
                        await savePetToMyList(pet);
                        await getAllPets();
                      }}
                    >
                      Save Pet
                    </Button>
                    <Button className=" me-2 btn-info">Ask about me!</Button>
                  </Col>
                )}
              </Row>
            ) : (
              <>
                <Col className="flex-row d-flex pb-0 justify-content-center">
                  <Button className=" me-2 btn-info">Ask about me!</Button>
                </Col>
              </>
            )}
          </Card.Footer>
        </Card>
      </Modal>
    </div>
  );
}
