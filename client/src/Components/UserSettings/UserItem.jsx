import React from "react";
import "../../Layout/usersCardLayout.css";
import { Button, Col } from "react-bootstrap";

function UserItem(props) {
  const { firstName, lastName, email, bio, phoneNumber, savedPets, role } =
    props;
  return (
    <Col className="person-card">
      <li className="person-data">
        <div className="person-name">
          <span className="text-light">
            {firstName} {lastName}
          </span>
        </div>
        <div className="user-mail">
          <p>Email: {email}</p>
        </div>
        <div className="user-phoneNumber">
          <p>Phone Number: {phoneNumber}</p>
        </div>
        <div className="user-role d-inline-flex ">
          <p>Role: {role}</p>
        </div>
        <Button
          className="ms-2"
          variant="info"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Show more
        </Button>
      </li>
    </Col>
  );
}

export default UserItem;
