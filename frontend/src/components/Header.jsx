import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3vw;
  background: #052210;
  z-index: 10;
  box-sizing: border-box;
`;

const RetalkLogo = styled.div`
  font-family: 'Luckiest Guy';
  font-size: 2rem;
  color: #00C853;
  cursor: pointer;
  white-space: nowrap;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  max-width: 60vw;
  justify-content: flex-end;
`;

const NavItem = styled.div`
  font-family: 'Pretendard';
  font-size: 1rem;
  font-weight: 600;
  color: ${({ active }) => (active ? '#00C853' : 'white')};
  cursor: pointer;
  white-space: nowrap;
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
  min-width: 70px;
  text-align: center;
  white-space: nowrap;
`;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
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
    if (location.pathname === '/') {
      window.location.href = '/';
    } else {
      navigate('/');
    }
  };

  const handleReadClick = () => {
    navigate('/read');
  };

  const handleTalkClick = () => {
    navigate('/talk');
  };

  return (
    <HeaderWrapper>
      <RetalkLogo onClick={goToMain}>RETALK</RetalkLogo>
      <NavGroup>
        <NavItem active={location.pathname === '/read'} onClick={handleReadClick}>
          Read
        </NavItem>
        <NavItem active={location.pathname === '/talk'} onClick={handleTalkClick}>
          Talk
        </NavItem>
        <AuthButton onClick={handleAuthClick}>
          {token ? 'Logout' : 'Login'}
        </AuthButton>
      </NavGroup>
    </HeaderWrapper>
  );
}