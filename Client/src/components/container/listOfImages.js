import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const List = (props) => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      navigate.push("/login");
    } else {
      getImages(token);
    }
  }, []);

  const getImages = (token) => {
    axios
      .get(`http://localhost:8000/getItem`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setImages(res.data.images);
      })
      .catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
        setImages([]);
      });
  };

  return (
    <div style={{ padding: "70px", display: "flex" }}>
      <br />
      {images?.map((row) => (
        <div align="center" style={{ padding: "20px" }}>
          <img
            src={`http://localhost:8000/${row.image}`}
            width="70"
            height="70"
          />
        </div>
      ))}
    </div>
  );
};

export default List;

{
  /* <div>
        <h2>List of Images</h2>
        <Link href="/upload">Back to upload</Link>
      </div> */
}



