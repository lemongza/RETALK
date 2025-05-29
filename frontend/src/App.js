import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/MainPage";
import TalkBoardPage from "./pages/Talk/TalkBoardPage";
import WritePage from "./pages/Talk/WritePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/talk" element={<TalkBoardPage />} />
      <Route path="/talk/write" element={<WritePage />} />
    </Routes>
  );
}

export default App;
