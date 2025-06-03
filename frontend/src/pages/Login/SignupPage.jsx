import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #052210;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-family: 'Pretendard';
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: 'Pretendard';
  font-size: 1rem;
  color: #c4c4c4;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 500px;
  height: 32px;
  padding: 0 0.5rem;
  background-color: #202020;
  border: 1px solid #383838;
  color: white;
  border-radius: 8px;
  font-family: 'Pretendard';
`;

const Button = styled.button`
  width: 500px;
  height: 40px;
  margin-top: 30px;
  background-color: #00C853;
  color: white;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nickName, setNickName] = useState(''); // ✅ 닉네임 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/auth/signup', {
        name,
        nickName, // ✅ 닉네임 포함
        email,
        password
      });

      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('회원가입 실패. 이미 존재하는 이메일일 수 있습니다.');
    }
  };

  return (
    <Wrapper>
      <Title>RETALK에 가입하고 독서의 즐거움을 함께 느껴보세요</Title>
      <Form onSubmit={handleSignup}>
        <Field>
          <Label>이름</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field>
          <Label>닉네임</Label> {/* ✅ 닉네임 필드 */}
          <Input value={nickName} onChange={(e) => setNickName(e.target.value)} />
        </Field>
        <Field>
          <Label>이메일</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field>
          <Label>비밀번호</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field>
          <Label>비밀번호 확인</Label>
          <Input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        </Field>
        <Button type="submit">가입하기</Button>
      </Form>
    </Wrapper>
  );
}