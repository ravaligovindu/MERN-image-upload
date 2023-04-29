import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import swal from "sweetalert";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Upload = (props) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate.push("/login");
    } else {
      setToken(token);
    }
    let username = localStorage.getItem("username");

    setName(username);
  }, []);

  const logOut = () => {
    localStorage.setItem("token", null);
    navigate.push("/");
  };

  const onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      setFileName(e.target.files[0].name);
    }
    setFile(e.target.value);
  };

  const addImage = () => {
    const fileInput = document.querySelector("#inputImage");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    axios
      .post("http://localhost:8000/addItem", formData, {
        headers: {
          "content-type": "multipart/form-data",
          token: token,
        },
      })
      .then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });

        setFile(null);
        // navigate("/list");
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
    <div>
      <div>
        <h2>Upload Images of {name}</h2>
      </div>
      <br />
      <br />
      <br />
      <Button variant="contained" component="label">
        {" "}
        Upload
        <input
          type="file"
          accept="image/*"
          name="file"
          value={file}
          onChange={onChange}
          id="inputImage"
          placeholder="File"
          hidden
          required
        />
      </Button>
      &nbsp;
      {fileName}
      <br />
      <br />
      <br />
      <Button
        disabled={file == null}
        onClick={addImage}
        color="primary"
        autoFocus
      >
        Add Image
      </Button>
    
    </div>
  );
};

export default Upload;


  {/* <Link href="/list">
          View Images List
        </Link> */}