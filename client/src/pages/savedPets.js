import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/AuthContext";
import api from "../utils/API";
import MyPets from "../Components/Pets/SavedPets/MyPets";
import Pets from "../Components/Pets/Pets";
import { Link } from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";
export default function SavedPets() {
  const { user } = useContext(UserContext);
  const [petsArray, setPetsArray] = useState([]);
  const [myPets, setmyPets] = useState(false);
  const [allPetsArray, setAllPetsArray] = useState([]);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

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
    if (response) {
      await handleSetPetsArray(response.savedPets);
      setShowLoadingSpinner(false);
    }
  };
  
  const DisplayAllPets = async (e) => {
    setShowLoadingSpinner(true);
    e.preventDefault();
    toggleMyPets();
    const response = await api.getAllPets();
    if (response) {
      setShowLoadingSpinner(false);
      return setAllPetsArray(response);
    }
  };

  useEffect(() => {
    (async () => {
      await getSavedPets();
    })();
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
                DisplayAllPets(e);
              }}
            >
              Show Available Pets
            </Link>
            <hr />
            {showLoadingSpinner ? (
              <div className="d-flex justify-content-center mt-5 pt-5">
                <Spinner />
              </div>
            ) : (
              <MyPets pets={petsArray} getSavedPets={getSavedPets} />
            )}
          </>
        ) : (
          <>
            <Link
              to="/search"
              href="/search"
              className="btn btn-primary btn-lg mx-3 mt-2 active"
              onClick={async (e) => {
                setShowLoadingSpinner(true);
                e.preventDefault();
                await getSavedPets();
                toggleMyPets();
              }}
            >
              Show My Pets
            </Link>
            <hr />
            {showLoadingSpinner ? (
              <div className="d-flex justify-content-center mt-5 pt-5">
                <Spinner />
              </div>
            ) : (
              <Pets
                pets={allPetsArray}
                handleSetPetsArray={handleSetPetsArray}
                setPetsArray={setPetsArray}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
