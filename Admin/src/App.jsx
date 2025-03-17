import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import IdApplications from "./pages/Applications/IdApplications";
import KraApplications from "./pages/Applications/KraApplications";
import DlRenewals from "./pages/Applications/DlRenewals";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/id-applications" element={<IdApplications />} />
        <Route path="/kra-applications" element={<KraApplications />} />
        <Route path="/dl-renewals" element={<DlRenewals />} />
      </Route>
    </Routes>
  );
};

export default App;
