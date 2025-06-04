import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SubRouter from "./components/SubRouter";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter basename="/retalk">
      <Routes>
        <Route path="/*" element={<SubRouter />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
