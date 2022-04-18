import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { UserContext } from "../Context/AuthContext";
import api from "../utils/API";
import { useHistory } from "react-router-dom";
import Doggo from "../media/shep.jpg";
import "../Layout/style.css";

export default function Home() {
  const { user, logout, setUser } = useContext(UserContext);
  const history = useHistory();
  const date = new Date();
  const dog_img = {
    background: `lightblue url(${Doggo}) no-repeat center center`,
    backgroundSize: "cover",
    height: "auto",
    borderRadius: "7px 0px 0px 7px",
  };
  const welcomPage = {
    height: "80vh",
    width: "80%",
    margin: "80px auto 0 auto",
    background: "#D7ECFF",
    borderRadius: "7px",
    boxShadow: "3px 7px 4px rgba(0, 0, 0, 0.25)",
  };

  const getUpdatedUserData = async (userId) => {
    const token = localStorage.getItem("token");
    if (token) {
      userId = user._id;
      const response = await api.getUserById(userId);
      setUser(response);
      history.push(`/${response._id}`);
    }
  };
  const setLocalStorage = () => {
    const hours = 1;
    const now = new Date().getTime();
    const setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear();
        logout(user);
        localStorage.setItem("setupTime", now);
        history.push("/");
      }
    }
  };

  const getUserData = async () => {
    const userId = localStorage.getItem("id");
    await getUpdatedUserData(userId);
    setLocalStorage();
  };

  useEffect(() => {
    try {
      (async () => {
        await getUserData();
      })();
    } catch (err) {
      return err.message;
    }
  }, []);

  return (
    <section style={welcomPage} className=" d-flex flex-col">
      <div className="w-50" style={dog_img}></div>
      {user.role === "user" ? (
        <div className="mt-5 pt-5">
          <div className="">
            <h1 className="ms-3">
              Hello{" "}
              <span>
                {user.firstName} {user.lastName}{" "}
              </span>
              how you doing??
            </h1>
            <p>Today is: {date.toLocaleString()}</p>
            <p>You can either browse for new pets or go to your saved pets.</p>
          </div>
          <Link
            to="/savedpets"
            href="/savedpets"
            className="btn btn-primary btn-lg mx-3 active"
            onClick={(e) => {
              e.preventDefault();
              history.push(`/savedpets/${user._id}`);
            }}
          >
            My Pets Page
          </Link>
          <Link
            to="/search"
            href="/search"
            className="btn btn-primary btn-lg mx-3 active"
            onClick={(e) => {
              e.preventDefault();
              history.push(`/search/${user._id}`);
            }}
          >
            Find me a pet!
          </Link>
        </div>
      ) : (
        <>
          {user.role === "admin" ? (
            <div className="app-wrapper mt-5 pt-5">
              <div className="App mt-4">
                <h1 className="">
                  Hello {user.firstName} {user.lastName} how you doing??
                </h1>
                <p>Today is: {date.toLocaleString()}</p>
                <p>
                  You can either browse for new pets or go to your saved pets.
                </p>
              </div>
              <Link
                to="/adminpanel"
                href="/adminpanel"
                className="btn btn-primary btn-lg mx-3 active"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/adminpanel/${user._id}`);
                }}
              >
                Admin Panel
              </Link>
              <Button
                className="btn btn-primary btn-lg mx-3 active"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/search/${user._id}`);
                }}
              >
                Show All Pets
              </Button>
            </div>
          ) : (
            <div className="mt-5 pt-5">
              <div className="mt-3">
                <h1 className="">Welcome to the pet adoption agency</h1>
                <p>go ahead and sign up to adopt a pet today</p>
                <p>
                  Or go ahead and use our search to find your perfect match
                  first.
                </p>
                <Button
                  className="btn btn-primary btn-lg mx-3 active"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/search`);
                  }}
                >
                  Browse Our Pets
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
