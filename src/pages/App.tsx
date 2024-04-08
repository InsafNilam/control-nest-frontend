import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "../lib/ProtectedRoute";
import AuthPage from "./Auth";

import Welcome from "./Welcome";
import Device from "./Device";
import Dashboard from "./Dashboard";
import Location from "./Location";

import { PageNotFound } from "../components/PageNotFound";

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth/login" element={<AuthPage />} />
        <Route element={<PrivateRoutes auth={token ? true : false} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/location" element={<Location />} />
          <Route path="/device" element={<Device />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default App;
