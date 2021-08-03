import React, { useState, useRef, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import Style from "./css/auth.module.css";
import { authContext } from "../context/authContext";

function Register() {
  let passwordRef = useRef(null);
  let emailRef = useRef(null);
  let typeRef = useRef(null);

  const { setRegister } = useContext(authContext);
  return (
    <div className="container">
      <div className="col-12 col-sm-6 col-md-6 col-lg-4" id={Style.mainStyling}>
        <div>
          <i
            className="fa fa-registered"
            aria-hidden="true"
            id={Style.Registerstyle}
          ></i>
          <h2>Register</h2>
        </div>
        <div>
          <form>
            <div className="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                ref={emailRef}
              ></input>
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                className="form-control"
                id="password"
                placeholder="Password"
                ref={passwordRef}
              ></input>
              <select name="type" id="type" ref={typeRef}>
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => setRegister(e, emailRef, passwordRef, typeRef)}
            >
              Register
            </button>
            <small
              className="form-text text-muted mt-4"
              style={{ float: "right" }}
            >
              Already have an account?
              <Link to="/login">
                <span style={{ color: "#007bff" }}>Get Login</span>
              </Link>
              First
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
