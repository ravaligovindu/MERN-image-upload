import React, { useState } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const Login = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    const pwd = bcrypt.hashSync(state.password, salt);

    axios
      .post("http://localhost:2000/login", {
        username: state.username,
        password: pwd,
      })
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        localStorage.setItem("username", res.data.username);
        window.dispatchEvent(new Event("storage"));

        navigate("/list");
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          swal({
            text: err.response.data.errorMessage,
            icon: "error",
            type: "error",
          });
        }
      });
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <div>
        <h2>Login</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="User Name"
          required
        />
        <br />
        <br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <br />
        <br />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={state.username === "" && state.password === ""}
          onClick={handleSubmit}
        >
          Login
        </Button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/signUp">SignUp</Link>
      </div>
    </div>
  );
};

export default Login;
