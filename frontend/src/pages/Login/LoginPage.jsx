// src/pages/LoginPage.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #052210;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8vw;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 6vw;
  width: 100%;
  max-width: 1200px;
`;

const LeftSection = styled.div`
  color: white;
  font-family: 'Luckiest Guy';
  font-size: 3.5vw;
  line-height: 1.2;
  flex: 1;
`;

const Highlight = styled.span`
  color: #00C853;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 300px;
`;

const Logo = styled.div`
  font-family: 'Luckiest Guy';
  font-size: 2rem;
  color: #00C853;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-family: 'Pretendard';
  font-size: 1rem;
  color: #C4C4C4;
  margin-top: 1rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #ffffff;
  margin-top: 0.2rem;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 1.5rem;
  background: #383838;
  color: white;
  font-family: 'Pretendard';
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const SignupButton = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 0.8rem;
  background: transparent;
  color: white;
  font-family: 'Pretendard';
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #383838;
  border-radius: 10px;
  cursor: pointer;
`;

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Content>
        <LeftSection>
          <div>INTERACTIVE</div>
          <div>BOOK CLUB PLATFORM</div>
          <div><Highlight>READ & TALK</Highlight></div>
        </LeftSection>
        <RightSection>
          <Logo>RETALK</Logo>
          <Label>이메일</Label>
          <Line />
          <Label>비밀번호</Label>
          <Line />
          <LoginButton>로그인</LoginButton>
          <SignupButton onClick={() => navigate('/signup')}>회원가입</SignupButton>
        </RightSection>
      </Content>
    </Wrapper>
  );
}