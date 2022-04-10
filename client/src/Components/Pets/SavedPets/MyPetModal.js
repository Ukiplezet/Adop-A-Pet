import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import api from "../../../utils/API";
import "../../../Layout/style.css";

export default function MyPetModal({ handleOpenEditForm, pet, getSavedPets }) {
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
    handleOpenEditForm();
    pet.adoptionStatus = status;
    pet.owner = user._id;
    await api.adoptOrFosterPet(status, pet, user);
  };

  const setPetFoster = async (pet) => {
    const status = "Fostered";
    handleOpenEditForm();
    pet.adoptionStatus = status;
    pet.owner = user._id;
    await api.adoptOrFosterPet(status, pet, user);
  };
  const removePetFromList = async (pet) => {
    const userId = user._id;
    handleOpenEditForm();
    await api.deletePet(userId, pet);
    await getSavedPets();
  };
  const returnPetToAgency = async (user, pet) => {
    handleOpenEditForm();
    await api.returnPet(user, pet);
    await getSavedPets();
  };

  return (
    <div>
      <Modal
        dialogClassName="my-pet-modal"
        className=""
        show={handleOpenEditForm}
        onHide={handleOpenEditForm}
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
                  <p>
                    <strong>Type:</strong> {type}
                  </p>
                  <p>
                    <strong>Breed:</strong> {breed}
                  </p>
                  <p>
                    <strong>Status:</strong> {adoptionStatus}
                  </p>
                  <p>
                    <strong>Color:</strong> {color}
                  </p>
                  <div>
                    <p>
                      <strong>Bio: </strong>
                      <p>{bio}</p>
                    </p>
                    <p className="">
                      <strong>Dietary Restrictions: </strong>
                      <p>{dietery}</p>
                    </p>
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
            <Row>
              {!pet.owner ? (
                <Col className="flex-row d-flex pb-0 justify-content-center">
                  {adoptionStatus === "Adopted" ? (
                    <>
                      <Button
                        className="btn-danger ms-2"
                        onClick={async () => {
                          await returnPetToAgency(user, pet);
                        }}
                      >
                        Return Pet
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="btn-danger  me-2"
                        onClick={async () => {
                          await removePetFromList(pet);
                        }}
                      >
                        Remove Pet
                      </Button>
                      {adoptionStatus === "Fostered" ? (
                        <Button
                          className="btn-success ms-2"
                          onClick={async () => {
                            await setPetAdoption(pet);
                          }}
                        >
                          Adopt Pet
                        </Button>
                      ) : (
                        <>
                          <Button
                            className="btn-success ms-2"
                            onClick={async () => {
                              await setPetAdoption(pet);
                            }}
                          >
                            Adopt Pet
                          </Button>
                          <Button
                            className="btn-info ms-2"
                            onClick={async () => {
                              await setPetFoster(pet);
                            }}
                          >
                            Foster Pet
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </Col>
              ) : (
                <>
                  {pet.owner === user._id ? (
                    <Col className="flex-row d-flex pb-0 justify-content-center">
                      {adoptionStatus === "Adopted" ? (
                        <>
                          <Button
                            className="btn-danger ms-2"
                            onClick={async () => {
                              await returnPetToAgency(user, pet);
                            }}
                          >
                            Return Pet
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            className="btn-danger  me-2"
                            onClick={async () => {
                              await returnPetToAgency(user, pet);

                            }}
                          >
                            Return Pet
                          </Button>
                          {adoptionStatus === "Fostered" ? (
                            <Button
                              className="btn-success ms-2"
                              onClick={async () => {
                                await setPetAdoption(pet);
                              }}
                            >
                              Adopt Pet
                            </Button>
                          ) : (
                            <>
                              <Button
                                className="btn-success ms-2"
                                onClick={async () => {
                                  await setPetAdoption(pet);
                                }}
                              >
                                Adopt Pet
                              </Button>
                              <Button
                                className="btn-info ms-2"
                                onClick={async () => {
                                  await setPetFoster(pet);
                                }}
                              >
                                Foster Pet
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </Col>
                  ) : (
                    <>
                      <Col className="flex-row d-flex pb-0 justify-content-center">
                        <Button
                          className="btn-danger  me-2"
                          onClick={async () => {
                            await removePetFromList(pet);
                          }}
                        >
                          Remove Pet
                        </Button>
                        <Button
                          className="btn-info ms-2"
                          onClick={async () => {
                            await removePetFromList(pet);
                            await getSavedPets();
                          }}
                        >
                          Ask Us About The Pet
                        </Button>
                      </Col>
                    </>
                  )}
                </>
              )}
            </Row>
          </Card.Footer>
        </Card>
      </Modal>
    </div>
  );
}
