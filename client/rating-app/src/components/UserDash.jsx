import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { authContext } from "../context/authContext";
import axios from "axios";
import StarRatings from "react-star-ratings";
import Card from "./card";
import "./css/create.css";

export default function UserDashboard() {
  const [allrest, setAllRest] = useState([]);

  const [user_id, setUser] = useState(
    JSON.parse(localStorage.getItem("user-token")).userCheck._id
  );

  useEffect(async () => {
    console.log("use effect called");
    getAll();
  }, []);

  const getAll = async () => {
    const res = await axios.get("/user/restaurants");
    console.log(res.data);
    setAllRest(res.data);
  };

  return (
    <div>
      <p>user</p>
      <div>
        <h1>All Restaurants</h1>
        <div className="boxContainer">
          {allrest.length > 0
            ? allrest.map((rest, index) => (
                <Card item={rest} key={index} user={user_id} />
              ))
            : null}
        </div>
      </div>
      <div>
        <Link to="/">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => localStorage.clear()}
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}
