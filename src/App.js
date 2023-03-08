import React from "react";
import Home from "./pages/Home";
import Avatar from "./pages/Avatar";
import Shape from "./pages/Shape";
import { Routes, Route } from "react-router-dom";
function App() {
  /**/
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shapes" element={<Shape />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="*" element={<h1>Page not found 404</h1>} />
      </Routes>
    </>
  );
}

export default App;
