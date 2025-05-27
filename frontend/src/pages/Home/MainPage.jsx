// src/pages/Home/MainPage.jsx
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #052210;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  box-sizing: border-box;
`;

const RetalkLogo = styled.div`
  font-family: 'Luckiest Guy';
  font-size: 2rem;
  color: #00C853;
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
`;

const LoginButton = styled.div`
  background: #00C853;
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  color: white;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 1rem;
`;

const TitleContainer = styled.div`
  text-align: right;
  color: white;
  font-family: 'Luckiest Guy';
  font-size: 4.5vw;
  line-height: 1.2;
  margin-top: -5vh;
`;

const Highlight = styled.span`
  color: #00C853;
`;

export default function MainPage() {
  return (
    <Wrapper>
      <Header>
        <RetalkLogo>RETALK</RetalkLogo>
        <NavGroup>
          <NavItem>Read</NavItem>
          <NavItem>Talk</NavItem>
          <LoginButton>Login</LoginButton>
        </NavGroup>
      </Header>
      <TitleContainer>
        <div>INTERACTIVE</div>
        <div>BOOK CLUB PLATFORM</div>
        <div><Highlight>READ & TALK</Highlight></div>
      </TitleContainer>
    </Wrapper>
  );
}