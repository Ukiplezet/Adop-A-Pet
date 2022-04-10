import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FileBase64 from "react-file-base64";
import Button from "react-bootstrap/Button";
import {
  FloatingLabel,
  Form,
  Row,
  Col,
  Container,
  Modal,
} from "react-bootstrap";
import fetchDogBreeds, { fetchCatsBreeds } from "./Breeds";
import "../../Layout/style.css";
import api from "../../utils/API";

export default function AddNewPet(props) {
  const [animalType, setAnimalType] = useState("");
  const [animalName, setAnimalName] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [picture, setPicture] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [bio, setBio] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietaryRest, setDietaryRest] = useState("");
  const [breed, setBreed] = useState("");
  const [breedsList, setBreedsList] = useState([]);

  const handlePostRequest = async (e) => {
    e.preventDefault();
    const newPet = {
      type: animalType,
      name: animalName,
      adoptionStatus: adoptionStatus,
      picture: picture,
      height: height,
      weight: weight,
      color: color,
      bio: bio,
      hypoallergenic: hypoallergenic,
      dietaryRest: dietaryRest,
      breed: breed,
    };
    await api.postPet(newPet);
    setAnimalType("");
    setAnimalName("");
    setAdoptionStatus("");
    setPicture("");
    setHeight("");
    setWeight("");
    setColor("");
    setBio("");
    setHypoallergenic("");
    setDietaryRest("");
    setBreed("");
    props.handleModalAddPet();
  };

  const toggleBreeds = async (animalType) => {
    const select = document.querySelector(".breeds");
    function removeAllChildNodes(parent) {
      if (parent == null) {
        return;
      } else {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
      }
    }

    if (animalType === "Dog") {
      removeAllChildNodes(select);
      setBreedsList(await fetchDogBreeds());
    } else if (animalType === "Cat") {
      removeAllChildNodes(select);
      setBreedsList(await fetchCatsBreeds());
    } else if (animalType === "Select") {
      removeAllChildNodes(select);
    }
  };

  return (
    <Modal
      show={props.addPetModal}
      onHide={props.handleModalAddPet}
      className="p-5 "
      dialogClassName="add-pet-modal"
    >
      <Container className="d-flex flex-col text-center  justify-content-center">
        <Col className="text-center py-3">
          <h4 className="p-0 m-0">Post A New Pet</h4>
          <Form className=" d-flex flex-col">
            <Row className="w-75">
              <Col className="me-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Animal Type"
                  className="my-2"
                >
                  <Form.Select
                    onChange={async (e) => {
                      setAnimalType(e.target.value);
                      toggleBreeds(e.target.value);
                    }}
                    name="type"
                    className=""
                    placeholder="Animal Type"
                    aria-label="Animal Type"
                    type="text"
                    value={animalType}
                  >
                    <option>Select</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="floatinganimalname"
                  label="Animal Name"
                >
                  <Form.Control
                    onChange={(e) => setAnimalName(e.target.value)}
                    name="animalName"
                    placeholder="Animal Name"
                    type="name"
                    value={animalName}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingStatus"
                  label="Adoption Status"
                  className="mb-2"
                >
                  <Form.Select
                    onChange={(e) => setAdoptionStatus(e.target.value)}
                    name="adoptionStatus"
                    className=""
                    placeholder="Adoption Status"
                    aria-label="Adoption Status"
                    type="text"
                    value={adoptionStatus}
                  >
                    <option></option>
                    <option value="Available">Available</option>
                    <option value="Fostered">Fostered</option>
                    <option value="Adopted">Adopted</option>
                  </Form.Select>
                </FloatingLabel>
                <div className="d-flex flex-row">
                  <FloatingLabel
                    className="mb-2 w-50 me-2"
                    controlId="floatingHeight"
                    label="Height"
                  >
                    <Form.Control
                      placeholder="Height"
                      onChange={(e) => setHeight(e.target.value)}
                      name="height"
                      type="number"
                      value={height}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-2 w-50 ms-2"
                    controlId="floatingWeight"
                    label="Weight"
                  >
                    <Form.Control
                      placeholder="Weight"
                      onChange={(e) => setWeight(e.target.value)}
                      name="weight"
                      type="number"
                      value={weight}
                    />
                  </FloatingLabel>
                </div>
              </Col>
              <Col className="justify-content-between">
                <FloatingLabel
                  className="my-2"
                  controlId="floatingBreed"
                  label="Breeds"
                >
                  <Form.Select
                    onChange={(e) => {
                        setBreed(e.target.value);
                    }}
                    name="Breeds"
                    id="breeds"
                    className="breeds"
                    placeholder="Breeds"
                    type="text"
                    value={breed}
                  ></Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingColor"
                  label="Color"
                  className="my-2"
                >
                  <Form.Select
                    onChange={(e) => setColor(e.target.value)}
                    name="type"
                    placeholder="Color"
                    aria-label="Color"
                    type="select"
                    value={color}
                  >
                    <option>Select</option>
                    <option value="Beige">Beige</option>
                    <option value="bicolor">Bicolor</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Brindle">Brindle</option>
                    <option value="Brown">Brown</option>
                    <option value="Cream">Cream</option>
                    <option value="Gold">Gold</option>
                    <option value="Grey">Grey</option>
                    <option value="Harlequin">Harlequin</option>
                    <option value="Merle">Merle</option>
                    <option value="Red">Red</option>
                    <option value="Saddle">Saddle</option>
                    <option value="Spotted">Spotted</option>
                    <option value="Tricolor">Tricolor</option>
                    <option value="Tuxedo">Tuxedo</option>
                    <option value="Tuxedo">White</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingHypo"
                  label="Hypoallergenic"
                  className="my-2"
                >
                  <Form.Select
                    onChange={(e) => setHypoallergenic(e.target.value)}
                    name="type"
                    className="Hypoallergenic"
                    placeholder="Hypoallergenic"
                    aria-label="Hypoallergenic"
                    type="select"
                    value={hypoallergenic}
                  >
                    {" "}
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel
                  className="mb-2 pb-1"
                  controlId="floatinganimaldiet"
                  label="Dietary Restrictions"
                >
                  <Form.Control
                    onChange={(e) => setDietaryRest(e.target.value)}
                    name="dietaryRest"
                    className="dietaryRest"
                    placeholder="Dietary Restrictions"
                    type="text"
                    value={dietaryRest}
                  />
                </FloatingLabel>
              </Col>
              <Form.Group controlId="petImage" className="mb-1">
                <Form.Label className="m-0 p-0">Add Photo </Form.Label>
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setPicture({ picture: base64 })}
                />
              </Form.Group>
            </Row>
            <Col>
              <FloatingLabel
                className="mx-3 py-2"
                controlId="floatingBio"
                label="Update Bio"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "350px" }}
                  rows={3}
                  placeholder="Update Bio"
                  onChange={(e) => setBio(e.target.value)}
                  name="bio"
                  type="text"
                  value={bio}
                />
              </FloatingLabel>
            </Col>
          </Form>
          <div>
            <Button variant="danger" onClick={props.handleModalAddPet}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={async (e) => {
                await handlePostRequest(e);
              }}
            >
              Add Pet
            </Button>
          </div>
        </Col>
      </Container>
    </Modal>
  );
}
