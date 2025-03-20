import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import KraApplications from "./pages/Applications/KraApplications";
import DlRenewals from "./pages/Applications/DlRenewals";
import LostId from "./pages/LostDocuments/LostId";
import LostPassports from "./pages/LostDocuments/LostPassports";
import LostDL from "./pages/LostDocuments/LostDL";
import IdApplications from "./pages/Applications/IdApplications";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/id-applications" element={<IdApplications />} />
        <Route path="/kra-applications" element={<KraApplications />} />
        <Route path="/dl-renewals" element={<DlRenewals />} />
        <Route path="/lost-id" element={<LostId />} />
        <Route path="/lost-passports" element={<LostPassports />} />
        <Route path="/lost-dl" element={<LostDL />} />
      </Route>
    </Routes>
  );
};

export default App;
