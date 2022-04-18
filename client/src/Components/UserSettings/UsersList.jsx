import React from "react";
import UserItem from "./UserItem";

function UsersList(props) {
  const { users } = props;
  return (
    <ul className="name-list">
      {users.map((user) => {
        return (
          <UserItem
            props={props}
            key={user._id}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            bio={user.bio}
            role={user.role}
            phoneNumber={user.phoneNumber}
            savedPets={user.savedPets}
          />
        );
      })}
    </ul>
  );
}

export default UsersList;
