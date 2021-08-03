import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import "./css/create.css";
import { authContext } from "../context/authContext";

function CreateRestaurant() {
  let restName = useRef(null);
  let restAddress = useRef(null);
  const { owner } = useContext(authContext);
  const [owner_id, setOwner] = useState(
    JSON.parse(localStorage.getItem("owner-token")).userCheck._id
  );

  const createRest = async (e, name, address) => {
    console.log("create called");
    const newRecord = {
      own: owner_id,
      name: name.current.value,
      address: address.current.value,
    };
    const post = await axios.post(`/owner/add/restaurant`, newRecord);
    console.log(post);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Add Restaurant</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="restaurant name"
          className="input-name"
          ref={restName}
        />
        <input
          type="text"
          placeholder="restaurant address"
          className="input-name"
          ref={restAddress}
        />
        <button
          type="button"
          className="btn btn-warning"
          onClick={(e) => createRest(e, restName, restAddress)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default CreateRestaurant;
