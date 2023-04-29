import React, { useState } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:8000/signup";
const Signup = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = () => {
    axios
      .post(URL, {
        username: state.username,
        password: state.password,
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <div>
        <h2>Sign up</h2>
      </div>
      <div>
        <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="username"
          value={state.username}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Password"
          required
        />
        <br />
        <br />
        <TextField
          id="standard-basic"
          type="password"
          autoComplete="off"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={onChange}
          placeholder="Confirm Password"
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
          onClick={submit}
        >
          Register
        </Button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
