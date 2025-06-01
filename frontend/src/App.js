// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import MainPage from './pages/Home/MainPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Login/SignupPage'; // ← 이거 쓸 거니까 유지

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {/* ✅ 이거 추가 */}
        </Routes>
      </Router>
    </>
  );
}

export default App;