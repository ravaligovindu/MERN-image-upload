import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/container/login";
import SignUp from "./components/container/signUp";
import Upload from "./components/container/upload";
import List from "./components/container/listOfImages";
import ResponsiveAppBar from "./components/header/index";

function App() {
  const [isSignin, setIssignin] = useState(false);
  const [isToken, setIsToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    window.addEventListener("storage", () => {
      const tokenIs = localStorage.getItem("token");
      if (tokenIs) {
        setIssignin(true);
      } else {
        setIssignin(false);
      }
    });
  }, [isToken]);

  return (
    <div className="App">
      <BrowserRouter>
        {localStorage.getItem("token") && <ResponsiveAppBar />}
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
