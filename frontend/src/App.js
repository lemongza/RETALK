import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReadPage from './pages/Read/ReadPage';
import MainPage from './pages/Home/MainPage';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/Login/SignupPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/read" element={<ReadPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* 나중에 TalkPage도 여기에 추가 */}
      </Routes>
    </Router>
  );
}

export default App;