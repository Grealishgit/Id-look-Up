import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout"; // Ensure this is correct

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
