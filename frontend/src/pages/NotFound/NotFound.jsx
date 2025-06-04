import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: #00c853;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
`;

const HomeButton = styled.button`
  background: #00c853;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #00b248;
  }
`;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>404</Title>
      <Subtitle>페이지를 찾을 수 없습니다</Subtitle>
      <Description>
        요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
      </Description>
      <HomeButton onClick={() => navigate("/")}>홈으로 돌아가기</HomeButton>
    </Container>
  );
}
