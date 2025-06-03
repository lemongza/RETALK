import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const Input = styled.input`
  width: 100%;
  height: 32px;
  margin-top: 0.3rem;
  padding: 0 0.5rem;
  background: #202020;
  border: 1px solid #383838;
  color: white;
  border-radius: 8px;
  font-family: 'Pretendard';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token); // 토큰 저장
      alert('로그인 성공!');
      navigate('/'); // 메인 페이지로 이동
    } catch (err) {
      alert('로그인 실패! 이메일 또는 비밀번호를 확인하세요.');
      console.error(err);
    }
  };

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
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label>비밀번호</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <SignupButton onClick={() => navigate('/signup')}>회원가입</SignupButton>
        </RightSection>
      </Content>
    </Wrapper>
  );
}