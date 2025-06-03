import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  background: #052210;
  z-index: 10;
`;

const RetalkLogo = styled.div`
  font-family: 'Luckiest Guy';
  font-size: 2rem;
  color: #00C853;
  cursor: pointer;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw;
`;

const NavItem = styled.div`
  font-family: 'Pretendard';
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const AuthButton = styled.div`
  background: #00C853;
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  color: white;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleAuthClick = () => {
    if (token) {
      localStorage.removeItem('token');
      alert('로그아웃 되었습니다.');
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const goToMain = () => {
    if (window.location.pathname === '/') {
      window.location.href = '/'; // 새로고침
    } else {
      navigate('/');
    }
  };

  return (
    <HeaderWrapper>
      <RetalkLogo onClick={goToMain}>RETALK</RetalkLogo>
      <NavGroup>
        <NavItem>Read</NavItem>
        <NavItem>Talk</NavItem>
        <AuthButton onClick={handleAuthClick}>
          {token ? 'Logout' : 'Login'}
        </AuthButton>
      </NavGroup>
    </HeaderWrapper>
  );
}