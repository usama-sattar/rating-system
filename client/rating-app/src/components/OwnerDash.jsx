import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { authContext } from "../context/authContext";
import axios from "axios";
import "./css/create.css";

export default function OwnerDashboard() {
  const [added, setAdded] = useState([]);
  const [owner_id, setOwner] = useState(
    JSON.parse(localStorage.getItem("owner-token")).userCheck._id
  );

  useEffect(async () => {
    console.log("use effect called");
    getAdded();
  }, []);

  const getAdded = async () => {
    const res = await axios.get(`/owner/restaurants/${owner_id}`);
    console.log(res.data);
    setAdded(res.data);
  };

  return (
    <div>
      <div>
        <h1>Added Restaurants</h1>
        <div className="boxContainer">
          {added.length > 0
            ? added.map((item) => {
                return (
                  //<Link to={{ pathname: "", state: item }}>
                  <Link>
                    <div className="boxStyle">{item.name}</div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
      <div>
        <Link to="/add/restaurant">
          <button type="button" className="btn btn-warning">
            Add Restaurant
          </button>
        </Link>
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
