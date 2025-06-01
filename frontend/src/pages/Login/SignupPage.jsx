// src/pages/SignupPage.jsx
import React from 'react';
import styled from 'styled-components';

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

const Line = styled.div`
  width: 500px;
  height: 1px;
  background-color: #ffffff;
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
  return (
    <Wrapper>
      <Title>RETALK에 가입하고 독서의 즐거움을 함께 느껴보세요</Title>
      <Form>
        <Field>
          <Label>이름</Label>
          <Line />
        </Field>
        <Field>
          <Label>이메일</Label>
          <Line />
        </Field>
        <Field>
          <Label>비밀번호</Label>
          <Line />
        </Field>
        <Field>
          <Label>비밀번호 확인</Label>
          <Line />
        </Field>
        <Button>가입하기</Button>
      </Form>
    </Wrapper>
  );
}