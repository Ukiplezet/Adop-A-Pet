import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { FloatingLabel, Form, Card } from "react-bootstrap";
import Pets from "../Components/Pets/Pets";
import api from "../utils/API";
import Spinner from "../Components/Spinner/Spinner";

export default function Search(props) {
  const [petsArray, setPetsArray] = useState("");
  const [searchType, setSearchType] = useState(false);
  const [animalType, setAnimalType] = useState("");
  const [animalName, setAnimalName] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [minHeight, setMinHeight] = useState("");
  const [height, setHeight] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [weight, setWeight] = useState("");
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const toggleSearchType = () => {
    if (!searchType) {
      setSearchType(true);
    } else {
      setSearchType(false);
    }
  };

  const handleSearchRequest = async () => {
    setShowLoadingSpinner(true);
    if (!searchType) {
      if (animalType === "Select") {
        await getAllPetsFromDB();
        return;
      } else if (animalType === "Cats" || animalType === "Dogs") {
        const petData = `search?query&type=${animalType.slice(0, -1)}`;
        const response = await api.getPetByCriteria(petData);
        if (response) {
          setPetsArray(response.data);
          setShowLoadingSpinner(false);
        }
      }
      return;
    } else {
      setShowLoadingSpinner(true);
      let petData = `search?query`;
      if (animalType === "Cats" || animalType === "Dogs") {
        petData += `&type=${animalType.slice(0, -1)}`;
        if (animalName) petData += `&name=${animalName}`;
        if (adoptionStatus) petData += `&adoptionStatus=${adoptionStatus}`;
        if (height) petData += `&height=${height}`;
        if (minHeight) petData += `&minheight=${minHeight}`;
        if (weight) petData += `&weight=${weight}`;
        if (minWeight) petData += `&minweight=${minWeight}`;
        const response = await api.getPetByCriteria(petData);
        setPetsArray(response.data);
      } else if (animalType === "Select" || !animalType) {
        if (animalName) petData += `&name=${animalName}`;
        if (adoptionStatus) petData += `&adoptionStatus=${adoptionStatus}`;
        if (height) petData += `&height=${height}`;
        if (minHeight) petData += `&minheight=${minHeight}`;
        if (weight) petData += `&weight=${weight}`;
        if (minWeight) petData += `&minweight=${minWeight}`;

        const response = await api.getPetByCriteria(petData);
        if (response) {
          await handleSetPetsArray(response.data);
          setShowLoadingSpinner(false);
        }
        if (
          petData === "search?query=" &&
          !(
            animalName &&
            adoptionStatus &&
            height &&
            weight &&
            minHeight &&
            minWeight
          )
        ) {
          await getAllPetsFromDB();
          return;
        }
      }
    }
  };

  const getAllPetsFromDB = async () => {
    const response = await api.getAllPets();
    if (response) {
      await handleSetPetsArray(response);
      setShowLoadingSpinner(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllPetsFromDB();
    })();
  }, []);

  async function handleSetPetsArray(petsArray) {
    setPetsArray(petsArray);
  }

  return (
    <>
      <div className="mt-5 pt-4">
        <h1>Find my next pet</h1>
        {!searchType ? (
          <div className=" text-center d-flex flex-col justify-content-center">
            <Card
              className="pb-3 px-5 mx-5 text-center"
              style={{ width: "500px" }}
            >
              <form className="">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Animal Type"
                  className="my-3"
                >
                  <Form.Select
                    onChange={(e) => setAnimalType(e.target.value)}
                    name="type"
                    className=""
                    placeholder="Animal Type"
                    aria-label="Animal Type"
                    type="text"
                  >
                    <option value="Select">Select</option>
                    <option value="Dogs">Dogs</option>
                    <option value="Cats">Cats</option>
                  </Form.Select>
                </FloatingLabel>
              </form>
              <div>
                <Button
                  variant="success"
                  onClick={toggleSearchType}
                  className=""
                >
                  Advanced Search
                </Button>
                <Button
                  variant="primary"
                  onClick={async () => await handleSearchRequest()}
                  className="ms-5"
                >
                  Find My Pet!
                </Button>
              </div>
            </Card>{" "}
          </div>
        ) : (
          <div className=" text-center d-flex flex-col justify-content-center">
            <Card
              className="pb-3 px-5 mx-5 text-center"
              style={{ width: "500px" }}
            >
              <form className="">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Animal Type"
                  className="my-3 "
                >
                  <Form.Select
                    onChange={(e) => setAnimalType(e.target.value)}
                    name="type"
                    className=""
                    placeholder="Animal Type"
                    aria-label="Animal Type"
                    type="text"
                  >
                    <option value="Select">Select</option>
                    <option value="Dogs">Dogs</option>
                    <option value="Cats">Cats</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  className="mb-3"
                  controlId="floatinganimalname"
                  label="Animal Name"
                >
                  <Form.Control
                    onChange={(e) => setAnimalName(e.target.value)}
                    name="animalName"
                    className=""
                    placeholder="Animal Name"
                    type="name"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingStatus"
                  label="Adoption Status"
                  className="mb-3"
                >
                  <Form.Select
                    onChange={(e) => setAdoptionStatus(e.target.value)}
                    name="adoptionStatus"
                    className=""
                    placeholder="Adoption Status"
                    aria-label="Adoption Status"
                    type="text"
                  >
                    <option></option>
                    <option value="Available">Available</option>
                    <option value="Fostered">Fostered</option>
                    <option value="Adopted">Adopted</option>
                  </Form.Select>
                </FloatingLabel>
                <div className="d-flex flex-row justify-content-between">
                  <FloatingLabel
                    className="mb-3 w-50 me-5"
                    controlId="floatingHeight"
                    label="Max Height"
                  >
                    <Form.Control
                      placeholder="Max Height"
                      onChange={(e) => {
                        setHeight(e.target.value);
                      }}
                      name="minHeight"
                      className=""
                      type="number"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3 w-50 me-5"
                    controlId="floatingHeight"
                    label="Min Height"
                  >
                    <Form.Control
                      placeholder=" Min Height"
                      onChange={(e) => setMinHeight(e.target.value)}
                      name="height"
                      className=""
                      type="number"
                    />
                  </FloatingLabel>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <FloatingLabel
                    className="mb-3 w-50 me-5"
                    controlId="floatingWeight"
                    label="Max Weight"
                  >
                    <Form.Control
                      placeholder="Weight"
                      onChange={(e) => setWeight(e.target.value)}
                      name="weight"
                      className=""
                      type="number"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-3 w-50 me-5"
                    controlId="floatingWeight"
                    label="Min Weight"
                  >
                    <Form.Control
                      placeholder="Min Weight"
                      onChange={(e) => setMinWeight(e.target.value)}
                      name="minWeight"
                      className=""
                      type="number"
                    />
                  </FloatingLabel>
                </div>
              </form>
              <div>
                <Button
                  variant="success"
                  onClick={toggleSearchType}
                  className=""
                >
                  Basic Search
                </Button>
                <Button
                  variant="primary"
                  onClick={(e) => handleSearchRequest(e)}
                  className="ms-5"
                >
                  Find My Pet!
                </Button>
              </div>
            </Card>{" "}
          </div>
        )}
      </div>
      <hr />
      {showLoadingSpinner ? (
        <div className="d-flex justify-content-center mt-5 pt-5">
          <Spinner />
        </div>
      ) : (
        <Pets
          pets={petsArray}
          handleSetPetsArray={handleSetPetsArray}
          setPetsArray={setPetsArray}
          getSavedPets={getAllPetsFromDB}
        />
      )}
    </>
  );
}
