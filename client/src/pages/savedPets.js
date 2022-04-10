import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/AuthContext";
import api from "../utils/API";
import MyPets from "../Components/Pets/SavedPets/MyPets";
import Pets from "../Components/Pets/Pets";
import { Link } from "react-router-dom";

export default function SavedPets() {
  const { user } = useContext(UserContext);
  const [petsArray, setPetsArray] = useState([]);
  const [myPets, setmyPets] = useState(false);
  const [allPetsArray, setAllPetsArray] = useState([]);

  const toggleMyPets = () => {
    if (!myPets) {
      setmyPets(true);
    } else {
      setmyPets(false);
    }
  };

  const getSavedPets = async () => {
    const userId = user._id;
    const response = await api.getPetByUserId(userId);
    await handleSetPetsArray(response.savedPets);
  };

  useEffect(() => {
    (
      async()=>{

        getSavedPets();
      }
    )();
  }, []);

  const handleSetPetsArray = async (petsArray) => {
    setPetsArray(petsArray);
    return setPetsArray;
  };
  return (
    <div className="mt-5 pt-5">
      <div className="">
        <h1 className="">Saved Pets Page</h1>
        <p>Show cards of all saved pets</p>
        {!myPets ? (
          <>
            <Link
              to="/search"
              href="/search"
              className="btn btn-primary btn-lg mx-3 mt-2 active"
              onClick={async (e) => {
                e.preventDefault();
                toggleMyPets();
                const response = await api.getAllPets();
                return setAllPetsArray(response);
              }}
            >
              Show Available Pets
            </Link>
            <hr />
            <MyPets pets={petsArray} getSavedPets={getSavedPets} />
          </>
        ) : (
          <>
            <Link
              to="/search"
              href="/search"
              className="btn btn-primary btn-lg mx-3 mt-2 active"
              onClick={async (e) => {
                e.preventDefault();
                await getSavedPets();
                toggleMyPets();
              }}
            >
              Show My Pets
            </Link>
            <hr />
            <Pets
              pets={allPetsArray}
              handleSetPetsArray={handleSetPetsArray}
              setPetsArray={setPetsArray}
            />
          </>
        )}
      </div>
    </div>
  );
}
