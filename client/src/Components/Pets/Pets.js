import React from "react";
import PetsCard from "./PetsCard";
import { Row } from "react-bootstrap";

export default function Pets({ getAllPetsFromDB, pets, setPetsArray }) {
  return (
    <div className="d-flex flex-row justify-content-evenly">
      <Row className="">
        {pets &&
          pets?.length > 0 &&
          pets?.map((val, pet) => {
            return (
              <PetsCard
                getAllPetsFromDB={getAllPetsFromDB}
                setPetsArray={setPetsArray}
                key={val._id}
                pet={val}
              />
            );
          })}
      </Row>
    </div>
  );
}
