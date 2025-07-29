import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={
            token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
