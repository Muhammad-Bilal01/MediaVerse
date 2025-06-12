import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path="/" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
