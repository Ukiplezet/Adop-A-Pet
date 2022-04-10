import React, { useContext } from "react";
import MyPetsCard from "./MyPetsCard";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Pets({ pets, getSavedPets }) {
  const { user } = useContext(UserContext);

  const history = useHistory();

  if (pets.length === 0) {
    return (
      <div className="d-flex flex-row justify-content-center">
        <Col className="">
          <h2 className="mt-5">You have no saved pets!</h2>
          <Link
            to="/search"
            href="/search"
            className="btn btn-primary btn-lg mx-3 mt-2 active"
            onClick={(e) => {
              e.preventDefault();
              history.push(`/search/${user._id}`);
            }}
          >
            Browse our pets
          </Link>
        </Col>
      </div>
    );
  } else {
    return (
      <div className="d-flex flex-row justify-content-center">
        <Row className="d-flex flex-row ">
          {pets &&
            pets.length > 0 &&
            pets.map((pet) => {
              return (
                <MyPetsCard
                  key={pet._id}
                  pet={pet}
                  getSavedPets={getSavedPets}
                />
              );
            })}
        </Row>
      </div>
    );
  }
}
