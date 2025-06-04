import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './pages/Home/MainPage';
import ReadPage from './pages/Read/ReadPage';
import WriteReviewPage from './pages/Read/WriteReviewPage';
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
        <Route path="/read/write" element={<WriteReviewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* TalkPage가 추가되면 여기에 Route로 추가 */}
      </Routes>
    </Router>
  );
}

export default App;