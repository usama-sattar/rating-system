import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Style from "./css/auth.module.css";
import { authContext } from "../context/authContext";

function Login() {
  const [user_id, setUser] = useState(null);
  const [owner_id, setOwner] = useState(null);
  let passwordRef = useRef(null);
  let emailRef = useRef(null);
  let typeRef = useRef(null);

  useEffect(async () => {
    const temp = await localStorage.getItem("owner-token");
    if (temp) {
      const temp1 = await JSON.parse(temp);
      setOwner(temp1.userCheck._id);
    }
    const temp2 = await localStorage.getItem("user-token");
    if (temp2) {
      const temp3 = await JSON.parse(temp2);
      setUser(temp3.userCheck._id);
    }
  }, []);

  const { setLogin, user, owner } = useContext(authContext);
  return (
    <div className="container">
      {console.log(user_id)}
      {user_id !== null ? (
        <Redirect to="/user/dash" />
      ) : owner_id !== null ? (
        <Redirect to="/owner/dash" />
      ) : null}
      <div className="col-12 col-sm-6 col-md-6 col-lg-4" id={Style.mainStyling}>
        <div>
          <i className="fas fa-sign-in-alt" id={Style.Loginicon}></i>
          <h2>Login</h2>
        </div>
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
                placeholder="Enter email"
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password"
                placeholder="Password"
                ref={passwordRef}
              ></input>
            </div>
            <div className="form-group">
              <select name="type" id="type" ref={typeRef}>
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => setLogin(e, emailRef, passwordRef, typeRef)}
            >
              Login
            </button>
            <small
              className="form-text text-muted mt-4"
              style={{ float: "right" }}
            >
              Don't have account?
              <Link to="/register">
                <span style={{ color: "#007bff" }}>Get Register</span>
              </Link>
              First
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
